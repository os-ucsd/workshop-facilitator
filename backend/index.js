const express = require('express');
const mongoose = require('mongoose');

// get the uri to connect to mongodb
const uri = require('./config').ATLAS_URI;

// Initialize express
const app = express();
const port = process.env.port || 3000;

// making the connection to mongodb
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to MongoDB');
})

// make room routes visible
const roomsRouter = require('./routes/rooms');
app.use('/rooms', roomsRouter);

// Listen on a port
app.listen(port,  () => {
    console.log(`Server running on port ${port}`);
});