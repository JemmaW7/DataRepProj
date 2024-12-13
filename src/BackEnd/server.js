const express = require('express');
const app = express();  
const port = 4000;  

// enable cors to allow cross-origin requests
const cors = require('cors');
app.use(cors());  

// middleware to parse json data
app.use(express.json());  

// custom middleware to set cors headers
app.use(function(req, res, next) {
  res.header("access-control-allow-origin", "*");  
  res.header("access-control-allow-methods", "get, post, put, delete, options"); 
  res.header("access-control-allow-headers", "origin, x-requested-with, content-type, accept");
  next();  
});

// middleware for parsing url-encoded data and json
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json()); 

// connect to mongodb database using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jwUSER:jemma@datarlab.in1rd.mongodb.net/'); 

// define a mongoose schema for pet data
const petSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: String,
    image: String
});
 
// create a mongoose model for the pet schema
const Pet = mongoose.model('Pet', petSchema);

// route to handle get request for the root url
app.get('/', (req, res) => {
    res.send('hello world');  
});

// route to create a new pet 
app.post('/api/pets', async (req, res) => {
    const { name, breed, age, image } = req.body;  // destructure the data from the request body
    const newPet = new Pet({ name, breed, age, image });  // create a new pet object
    await newPet.save();  
    res.status(201).json({ message: 'pet adoption created successfully', pet: newPet });
});

// route to fetch a list of all pets 
app.get('/api/pets', async (req, res) => {
    const pets = await Pet.find({}); 
    res.json(pets); 
});

// route to fetch a specific pet by its id
app.get('/api/pet/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id); 
    res.send(pet);  
});

// route to update a pet by its id
app.put('/api/pet/:id', async (req, res) => {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.send(pet);
});

// route to delete a pet by its id 
app.delete('/api/pet/:id', async (req, res) => {
    const pet = await Pet.findByIdAndDelete(req.params.id); 
    res.status(200).send({ message: "pet adoption deleted successfully", pet });
});

// route to fetch random pets
app.get('/api/pets/random', async (req, res) => {
    try {
        const allPets = await Pet.find();  
        const shuffled = allPets.sort(() => 0.5 - Math.random());  // shuffle the pets array
        const randomPets = shuffled.slice(0, 3);  // select 3 random pets
        res.json(randomPets);  
    } catch (error) {
        console.error('error fetching random pets:', error);
        res.status(500).send('server error');
    }
});

// start the server and listen on the specified port
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);  // log when the server is successfully running
});
