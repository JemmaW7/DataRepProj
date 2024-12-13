import Pets from "./pets";  // import the pets component to display the list of pets
import { useEffect, useState } from "react";  // import hooks from react
import axios from "axios";  // import axios for http requests
import Search from './search';

const Read = () => {

  const [pets, setPets] = useState([]);  // state to store the list of pets
  const [searchTerm, setSearchTerm] = useState("");  // state for the search term

  // fetch the list of pets when the component mounts
  useEffect(() => {
    axios.get('http://localhost:4000/api/pets')  // fetch pets from api
      .then((response) => {
        console.log(response.data);  // log the response data
        setPets(response.data);  // update pets state
      })
      .catch((error) => {
        console.log(error);  // log any errors
      });
  }, []);

  // reload the pet list to ensure data is up-to-date
  const Reload = () => {
    console.log("reloading pet data...");
    axios.get('http://localhost:4000/api/pets')  // fetch updated data
        .then((response) => {
            setPets(response.data);  // update pets state
        })
        .catch((error) => {
            console.error("error reloading data:", error);  // log errors
        });
  };

  // update search term state
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // filter pets based on search term
  //making it case-insensitive by putting it to lowercase
  const filteredPets = searchTerm
    ? pets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
          pet.breed.toLowerCase().includes(searchTerm.toLowerCase())  
      )
    : pets;

  // reload data when component mounts
  useEffect(() => {
    Reload();
  }, []);

  return (
    <div class="petPage">
      <h3 class="petPageTitle">Pet Adoption Listings</h3>
      <Search onSearch={handleSearch} />  {/* search bar for filtering pets */}
      <Pets myPets={filteredPets} ReloadData={Reload} />  {/* list of pets */}
    </div>
  );
}

export default Read;
