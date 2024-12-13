import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { FaEdit, FaPaw, FaBirthdayCake } from 'react-icons/fa'; // Import specific icons


// petitem component displays individual pet details with options to edit or delete
function PetItem(props) {
  useEffect(() => {
    console.log("Pet Item:", props.mypet);
  }, [props.mypet]); // Only run this effect when the mypet prop changes


  // Delete function to handle removing a pet
  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:4000/api/pet/'+ props.mypet._id) // delete pet by ID
      .then(() => {
        props.Reload(); // Refresh the pet list after deletion
      })
      .catch((error) => {
        console.error("Error deleting pet:", error);
      });
  };

  //return back data in a card format
  return (
    <div>
      <Card>
        <Card.Header>{props.mypet.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
          <Card.Img 
            variant="top" 
            src={props.mypet.image || "default-image.jpg"} 
            alt={props.mypet.name} 
            className="img-fluid"
          />
            <p><strong><FaPaw /> Breed:</strong> {props.mypet.breed} </p>
            <p><strong><FaBirthdayCake /> Age:</strong> {props.mypet.age}</p>
          </blockquote>
        </Card.Body>
        <div className="pet-card-buttons">
        <Link to={"/edit/" + props.mypet._id} className="btn btn-edit"><FaEdit /> Change details</Link>
      <Button className="btn btn-del" onClick={handleDelete}>Adopted</Button>
    </div>
      </Card>
    </div>
  );
}

export default PetItem;
