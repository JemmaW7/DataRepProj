import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreatePet = () => {

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // log the form data to the console
        console.log(`Name: ${name}, Breed: ${breed}, Age: ${age}, Image: ${image}`);

        const pet = {
          name: name,
          breed: breed,
          age: age,
          image: image
        };

        axios.post('http://localhost:4000/api/pets', pet)
            .then((res) => {
                console.log("Pet Added Successfully:", res.data);
                navigate('/pets'); // navigate to the pet listing page
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h3>Add a New Pet for Adoption</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Pet Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Breed: </label>
                    <input type="text"
                        className="form-control"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Age: </label>
                    <input type="number"
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
                <div>
                    <input type="submit" value="Add Pet" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CreatePet;
