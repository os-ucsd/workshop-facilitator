const express = require('express');

// Initialize express
const app = express();

// Listen on a port
app.listen(3000,  () => {
    console.log("Server started")
});