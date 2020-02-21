const mongoose = require('mongoose');
const express = require('express');
const app = express();

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

// io object will listen for connection event
io.on("connection", socket => {
    console.log("user connected");

    // listen for when a new poll was sent out, show to all clients
    socket.on("publish", pollData => {
        // send poll question to all clients
        io.sockets.emit("publish", pollData);
    })

    // listen for when an answer was submitted
    socket.on("answer", answerData => {
        switch(answerData.answer){
            case "A": answerA++; break;
            case "B": answerB++; break;
            case "C": answerC++; break;
            case "D": answerD++; break;
            default: continue
        }
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
