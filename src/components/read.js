import Pets from "./pets";  // Import the Pets component to display the list of pets
import { useEffect, useState } from "react";  // Import hooks from React
import axios from "axios";  // Import Axios for making HTTP requests
import Search from './search';


const Read = () => {

  const [pets, setPets] = useState([]);  // Initialize `pets` as an empty array
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect hook to fetch the list of pets when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/pets')  // Fetch pets from the backend API
      .then((response) => {
        console.log(response.data);  // Log the response data (pets list)
        setPets(response.data);  // Update the state with the fetched pets
      })
      .catch((error) => {
        console.log(error);  // Log any errors encountered during the request
      });
  }, []);  

  // Function to reload the pet list with updated data
  const Reload = () => {
    console.log("Reloading pet data...");
    axios.get('http://localhost:4000/api/pets')
        .then((response) => {
            setPets(response.data);
        })
        .catch((error) => {
            console.error("Error reloading data:", error);
        });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPets = searchTerm
    ? pets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pets;

  // Call to reload function to ensure data is fetched initially
  useEffect(() => {
    Reload();
  }, []);

  return (
    <div>
      <h3 class="petPage">Pet Adoption Listings</h3>
      <Search onSearch={handleSearch} />
      <Pets myPets={filteredPets} ReloadData={Reload} />  {/* Pass pet data to the Pets component */}
    </div>
  );
}

export default Read;
