import PetItem from "./petitem";

// props are used to pass data and functions from parent to child components
// map is used to loop through the pets array and render a petitem for each pet
const Pets = (props) => {
    return (
        <div className="pet-grid">
            {props.myPets.map((pet) => (
                <PetItem mypet={pet} key={pet._id} Reload={props.ReloadData} />
            ))}
        </div>
    );
}

export default Pets;
