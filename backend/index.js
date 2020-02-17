const express = require('express');
const app = express();

// Listen on a port
const port = process.env.port || 5000;
const server = app.listen(port,  () => {
    console.log(`Server running on port ${port}`);
});

const mongoose = require('mongoose');

// initialize socket.io
const io = require('socket.io').listen(server);

// get the uri to connect to mongodb
const uri = require('./config').ATLAS_URI;

// making the connection to mongodb
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB');
})

// io object will listen for connection event
io.on("connection", socket => {
    console.log("user connected");

    // listen for disconnect event (when user leaves)
    socket.on("disconnect", () => {
        console.log("a user disconnected");
    })
})

// make room routes visible
const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter);
