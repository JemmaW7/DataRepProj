import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPet() {
  const { id } = useParams(); // Get the pet's ID from the URL
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/pet/'+ id)
      .then((response) => {
        setName(response.data.name);
        setBreed(response.data.breed);
        setAge(response.data.age);
        setImage(response.data.image);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPet = { id, name, breed, age, image };
    axios.put('http://localhost:4000/api/pet/'+ id, newPet)
      .then((res) => {
        console.log("Success: " + res.data);
        navigate('/read'); // Redirect to the pet listing page
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Edit Pet Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pet Name: </label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label>Breed: </label>
          <input 
            type="text" 
            className="form-control" 
            value={breed} 
            onChange={(e) => setBreed(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Age: </label>
          <input 
            type="number" 
            className="form-control" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Image: </label>
          <input type="text" 
                className="form-control" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} />    
        </div>
        <div className="form-group">
          <input 
            type="submit" 
            value="Save Changes" 
            className="btn btn-primary" 
          />
        </div>
      </form>
    </div>
  );
}
