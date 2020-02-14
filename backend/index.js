const express = require('express');

// Initialize express
const app = express();
const port = process.env.port || 3000;

// Listen on a port
app.listen(port,  () => {
    console.log(`Server running on port ${port}`);
});