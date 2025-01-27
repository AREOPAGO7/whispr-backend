const express = require('express');
const bodyParser = require('body-parser'); // Add body-parser dependency
const connectDB = require('./config/db'); // Your MongoDB connection file
const { getUsers, createUser } = require('./controllers/userController'); // Your controller functions

const app = express();
const port = 7000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Routes
app.get('/users', getUsers); // Route to get all users
app.post('/createUser', createUser); // Route to create a new user

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
