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

// array of poll questions, each is an object that includes the poll question and the room id
let currPollQuestions = [];

findIfActiveQuestion = (pollData, roomName) => {
    console.log(pollData, roomName);
    for (let i = 0; i < currPollQuestions.length; i++){
        const {currPollQuestion, name} = currPollQuestions[i];
        // make sure only 1 question published at a time
        console.log(name.toString() === roomName.toString());
        if (name.toString() === roomName.toString()){
            return i;
        }
    }
    return -1;
}

// io object will listen for connection event
io.on("connection", socket => {
    console.log("user connected");

    // whenever user connected, if there's a published poll, automatically send the new user
    //if (currPollQuestion._id) io.sockets.emit("publish", currPollQuestion);
        //io.in(pollData.name).emit("publish", currPollQuestion);

    // when a user joins/host creates a room, create a new socketroom
    socket.on("join", data => {
        console.log("YEET MY MEAT", data);
        socket.join(data.name);

        // whenever user connected, if there's a published poll, automatically send the new user
        //if (currPollQuestion._id) io.in(data.name).emit("publish", currPollQuestion);
        const active = findIfActiveQuestion(null, data.name);
        console.log(data.name + " just joined. there is an active question at " + active);
        if (active >= 0){
            io.in(data.name).emit("publish", currPollQuestions[active].currPollQuestion);
        }

        //socket.emit("welcome", {name: data.name});
    })

    // listen for when a new poll was sent out, show to all clients
    socket.on("publish", pollData => {
        console.log(currPollQuestions);
        // find if room has an active question already
        const active = findIfActiveQuestion(pollData.pollData, pollData.name);
        console.log("active", currPollQuestions)

        // make sure only 1 question published at a time
        if (active >= 0){
            console.log("already published question, cannot publish");
            socket.emit("err", {error: "there's an active question already", currPollQuestion: currPollQuestions[active]});
        }
        /*
        else if (currPollQuestion && currPollQuestion._id === pollData.pollData._id){
            // if trying to publish the same question
            console.log("this question is already published");
            const err = {
                error: "this question already published"
            }
            socket.emit("err", err)
        }
        */
        else{
            console.log("published", pollData);
            const currPollQuestion = pollData.pollData;
            currPollQuestions.push({name: pollData.name, currPollQuestion});

            /*
            TODO: add socket.on("publish") event to user view page, so the user can view the poll
            */
            // send poll question to all clients and allow host to know which question is published
            //io.sockets.emit("publish", currPollQuestion);
            io.in(pollData.name).emit("publish", currPollQuestion);
        }
    })

    socket.on("unpublish", pollData => {
        // store question and answers in db
        const {pollId, name} = pollData;
        // find if room has an active question already
        const active = findIfActiveQuestion(null, name);

        // check if there was a poll actually published before this
        if (active === -1){
            console.log("no poll published, so can't unpublish");
            socket.emit("err", {error: "no question is currently published"});
            return;
        }
        // check to make poll the host is trying to unpublish is the current poll
        //if (currPollQuestion._id.toString() !== pollId){
        console.log(currPollQuestions, active)
        if (currPollQuestions[active].currPollQuestion._id.toString() !== pollId){
            console.log("a different poll is published, so cannot unpublish this poll");
            socket.emit("err", {error: "a different poll is published, so cannot unpublish this poll"});
            return;
        }

        // reset to empty
        //currPollQuestion = {};
        // remove room's current poll from currpoll array
        currPollQuestions.splice(active, 1);

        // reset all answers
        answerA = 0;
        answerB = 0;
        answerC = 0;
        answerD = 0;

        console.log("poll unpublished", currPollQuestions);
        // unpublish for all users (host and user), so it disappears from screen
        io.in(name).emit("unpublish", {text: "unpublish complete"});
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

    // listen for disconnect event (when user leaves)
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })
})

// make room routes visible
const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter);
