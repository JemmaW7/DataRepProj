// Importing required modules
const express = require('express');
const app = express();  // Initialize an Express application
const port = 4000;  // Define the port number for the server

// Route to handle GET request for the root URL
app.get('/', (req, res) => {
    res.send('Hello World');  
});

// Enable CORS to allow cross-origin requests
const cors = require('cors');
app.use(cors());  // CORS middleware to allow requests from other origins

// Middleware to parse JSON data
app.use(express.json());  

// Custom middleware to set CORS headers (could be redundant with `cors()` above)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  // Allow specific headers
  next();  
});

// Middleware for parsing URL-encoded data and JSON
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));  // Middleware for parsing URL-encoded data
app.use(bodyParser.json());  // Middleware for parsing JSON data

// Connect to MongoDB database using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jwUSER:jemma@datarlab.in1rd.mongodb.net/');  // MongoDB Atlas connection string

// Define a Mongoose schema for Movie data
const petSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: String,
    image: String
});
 
// Create a Mongoose model for the Movie schema
const Pet = mongoose.model('Pet', petSchema);

// Route to create a new movie (POST request)
app.post('/api/pets', async (req, res) => {
    console.log("Pet added: " + req.body.title);  // Log the title of the movie being added

    const { name, breed, age, image } = req.body;  // Destructure the data from the request body
   
    const newPet = new Pet({ name, breed, age, image });  // Create a new movie object
    await newPet.save();  // Save the new movie to the database
   
    res.status(201).json({ message: 'Pet adoption created successfully', pet: newPet });  // Send a success response with the new movie
});

// Route to fetch a list of all movies (GET request)
app.get('/api/pets', async (req, res) => {
    const pets = await Pet.find({});  // Fetch all movies from the database
    res.json(pets); 
});

// Route to fetch a specific movie by its ID (GET request)
app.get('/api/pet/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id);  
    res.send(pet);  
});

// Route to get movie by its ID 
 app.get('/api/pet/:id', async (req, res) => {
   let pet = await Pet.findById({ _id: req.params.id });
   res.send(pet);
});

// Route to get movie by its ID and update it
app.put('/api/pet/:id', async (req, res) => {
    let pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(pet);
});


// Route to get movie by its ID and delete it
app.delete('/api/pet/:id', async (req, res) => {
  
    console.log('Deleting pet adoption with ID:', req.params.id);
    const pet = await Pet.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Pet adoption deleted successfully", pet });
    
});



app.post('/api/pets', (req, res) => {
    const pet = req.body;  // Get the movie data from the request body
    res.status(201).json(pet);  
});


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);  // Log when the server is successfully running
});
