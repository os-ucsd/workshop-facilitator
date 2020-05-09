const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const bodyParser = require('body-parser');//attemp to make req.body not null
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Server listening on a port
const port = process.env.port || 5000;
const server = app.listen(port,  () => {
    console.log(`Server running on port ${port}`);
});

// get the uri to connect to mongodb
const uri = require('./config').ATLAS_URI;

// making the connection to mongodb
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB');
})


// initialize socket.io with the server
const io = require('socket.io').listen(server);

let answerA = 0;
let answerB = 0;
let answerC = 0;
let answerD = 0;

// contents: [{poll: {}, name: ""}]
let publishedPolls = [];

roomHasPublishedQuestion = roomName => {
    for (let i = 0; i < publishedPolls.length; i++){
        if (publishedPolls[i].name === roomName) return i;
    }
    return -1;
}

// io object will listen for connection event
io.on("connection", socket => {
    // whenever user connected, if there's a published poll, automatically send to the new user
    socket.on("join", data => {
        // name is the id of the workshop room
        socket.join(data.name);

        // if this room has a poll published already, send an emit call to publish
        const hasPublishedIdx = roomHasPublishedQuestion(data.name);
        if (hasPublishedIdx > -1){
            const poll = publishedPolls[hasPublishedIdx].poll;
            console.log(`room ${data.name} has a question published already: ${poll.question}`);
            socket.emit("publishNewUser", poll)
        }

        console.log(`socket has joined ${data.name}. now there's ${io.sockets.adapter.rooms[data.name].length} users`);
        socket.emit("welcome", {roomID: data.name});
    })

    // listen for when a new poll was sent out, show to all clients
    socket.on("publish", pollData => {
        // checks to make sure only one question is published at a time for a room
        const hasPublishedIdx = roomHasPublishedQuestion(pollData.name);
        // if hasPublished is true, then that room has a published poll
        if(hasPublishedIdx > -1){
            console.log("question is already published for room " + pollData.name);
            socket.emit("err", {error: "question is already published for room " + pollData.name + ": " + publishedPolls[hasPublishedIdx].poll.question})
        }
        
        else{
            console.log("published", pollData);
            // to keep track of what the current question is
            publishedPolls.push({poll: pollData.pollData, name: pollData.name});

            // send poll question to all clients and allow host to know which question is published
            //io.sockets.emit("publish", currPollQuestion);
            io.in(pollData.name).emit("publish", pollData.pollData);
        }
    })

    socket.on("unpublish", data => {
        // check if poll actually published
        const hasPublishedIdx = roomHasPublishedQuestion(data.name);
        if (hasPublishedIdx === -1) {
            socket.emit("err", {error: "no question is currently published for room " + data.name});
            return;
        }
        else {
            const poll = publishedPolls[hasPublishedIdx].poll;
            // check if the published poll matches the poll the user is trying to unpublish
            if (poll._id.toString() !== data.pollId) {
                socket.emit("err", {error: "a different poll is published: " + poll.question});
                return;
            }
        }

        // reset all answers
        answerA = 0;
        answerB = 0;
        answerC = 0;
        answerD = 0;

        console.log("poll unpublished");
        // remove poll from array of published polls
        publishedPolls.splice(hasPublishedIdx, 1);

        // unpublish for all users (host and user), so it disappears from screen
        //io.sockets.emit("unpublish", {text: "unpublish complete"});
        io.in(data.name).emit("unpublish", {text: "unpublished complete", roomID: data.name})
    })

    // listen for when an answer was submitted
    socket.on("answer", answerData => {
        console.log(`answered ${answerData.answer}`);
        switch(answerData.answer){
            case "A": answerA++; break;
            case "B": answerB++; break;
            case "C": answerC++; break;
            case "D": answerD++; break;
            default: break;
        }
    })

    // listen for when answer should be shown, then send to all sockets
    socket.on("showAnswer", answer => {
        io.sockets.emit("showAnswer", answer);
    })

    // listen for when the host wants to see the answers
    socket.on("getAnswers", pollId => {
        // if poll is not the currently published poll or no published poll, don't show answers
        if (!currPollQuestion._id){
            socket.emit("err", {error: "cannot get answers because no poll is published"});
            return;
        }

        if (currPollQuestion._id && currPollQuestion._id.toString() !== pollId){
            socket.emit("err", {error: "this poll is not the published poll, so can't get answers"});
            return;
        }

        socket.emit("getAnswers", {answerA, answerB, answerC, answerD});
    })

    socket.on("question", data => {
        // emit to all sockets connected to the server that there was a new question
        console.log(data);
        io.sockets.emit("question", data);
    })

    socket.on("uploadURL", urlData => {
        console.log("uploading url " + urlData);
        io.sockets.emit("uploadURL", urlData);
    })

    // listen for disconnect event (when user leaves)
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })

    //testing go slow
    socket.on("slower", () => {
        console.log("someone wants to go slower");
        io.sockets.emit("slower", {data:"nothing"});
    })

    socket.on("slowerReset", () => {
        console.log("slower reset");
        io.sockets.emit("slowerReset", {data:"nothing"});

    })



})

// make room routes visible
const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter);
