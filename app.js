const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorController = require('./controllers/errorController'); //
const comicBookRoutes = require('./routes/comicBookRoutes');


// Load environment variables from a .env file
dotenv.config({ path: './config.env' });



// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up routes for the comic book API
app.use('/api/v1/comics', comicBookRoutes); // Use the correct imported variable name


// Global error-handling middleware
app.use(errorController);




// Connect to MongoDB
// mongoose.connect(process.env.CONN_STR, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log('DB Connection Successful');
// });

// const port = process.env.PORT || 3000;

// const server = app.listen(port, () => {
//     console.log('Server has started...');
// });


module.exports = app;
