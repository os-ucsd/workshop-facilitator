const express = require('express');
const app = express();

const mongoose = require('mongoose');
const http = require("http").createServer(app);
// initialize socket.io
const io = require('socket.io')(http);

// get the uri to connect to mongodb
const uri = require('./config').ATLAS_URI;

// Initialize express
const port = process.env.port || 3000;

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

// Listen on a port
http.listen(port,  () => {
    console.log(`Server running on port ${port}`);
});