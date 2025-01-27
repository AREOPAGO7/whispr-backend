const express = require('express');
const bodyParser = require('body-parser'); // Add body-parser dependency
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db'); // Your MongoDB connection file
const { getUsers, createUser } = require('./controllers/userController'); // Your controller functions

const app = express();
const port = 7000;

// Middleware to enable CORS for port 3000
 // Start of Selection
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'] // Allow GET and POST methods
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to the database
connectDB();

// Routes
// Routes
app.get('/users', getUsers); // Route to get all users
app.post('/users', getUsers); // Add this line to handle POST /users
app.post('/createUser', createUser); // Route to create a new user

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});