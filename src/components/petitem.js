import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';

function PetItem(props) {
  useEffect(() => {
    console.log("Pet Item:", props.mypet);
  }, [props.mypet]); // Only run this effect when the mypet prop changes

  // Delete function to handle removing a pet
  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:4000/api/pets/${props.mypet._id}`) // delete pet by ID
      .then(() => {
        props.Reload(); // Refresh the pet list after deletion
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  return (
    <div>
      <Card>
        <Card.Header>{props.mypet.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
          <img src={props.mypet.image} alt={props.mypet.name} />
            <p>Breed: {props.mypet.breed}</p>
            <p>Age: {props.mypet.age}</p>
          </blockquote>
        </Card.Body>
        <Link to={`/edit/${props.mypet._id}`} className="btn btn-primary">Edit</Link>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

export default PetItem;