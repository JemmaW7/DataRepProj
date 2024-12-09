import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Carousel from "react-bootstrap/Carousel";

const Content = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/pets/random')
            .then(response => setPets(response.data))
            .catch(error => console.error('Error fetching random pets:', error));
    }, []);

    return (
        <div class="home">
            <h1>Adopt a Pet!</h1>
            <div class="caro-con">
                <Carousel>
                    {pets.map((pet) => (
                        <Carousel.Item key={pet._id}>
                           <img
                             className="d-block w-100"
                              src={pet.image}
                              alt={pet.name}
                           />
                           <Carousel.Caption>
                            <h3>{pet.name}</h3>
                            <p>{pet.breed}</p>
                         </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default Content;
