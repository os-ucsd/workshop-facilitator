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

let currPollQuestion = {};

// io object will listen for connection event
io.on("connection", socket => {
    console.log("user connected");

    // listen for when a new poll was sent out, show to all clients
    socket.on("publish", pollData => {
        console.log(currPollQuestion);
        // make sure only 1 question published at a time
        if (currPollQuestion._id && currPollQuestion._id !== pollData.pollData._id){
            console.log("already published question, cannot publish");
            socket.emit("err", {error: "there's an active question already", currPollQuestion: currPollQuestion});
        }
        else if (currPollQuestion && currPollQuestion._id === pollData.pollData._id){
            // if trying to publish the same question
            console.log("this question is already published");
            const err = {
                error: "this question already published"
            }
            socket.emit("err", err)
        }
        else{
            console.log("published", pollData);
            // to keep track of what the current question is
            console.log(pollData.pollData);
            currPollQuestion = pollData.pollData;

            /*
            TODO: add socket.on("publish") event to user view page, so the user can view the poll
            */
            // send poll question to all clients and allow host to know which question is published
            io.sockets.emit("publish", currPollQuestion);
        }
    })

    socket.on("unpublish", () => {
        // store question and answers in db

        // check if there was a poll actually published before this
        if (! currPollQuestion._id){
            console.log("no poll published, so can't unpublish");
            socket.emit("err", {error: "no question is currently published"});
            return;
        }

        // reset to empty
        currPollQuestion = {};

        // reset all answers
        answerA = 0;
        answerB = 0;
        answerC = 0;
        answerD = 0;

        console.log("poll unpublished");
        socket.emit("unpublish", {text: "unpublish complete"});
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
    socket.on("getAnswers", () => {
        socket.emit("getAnswers", {answerA, answerB, answerC, answerD});
    })

    // listen for disconnect event (when user leaves)
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })
})

// make room routes visible
const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter);
