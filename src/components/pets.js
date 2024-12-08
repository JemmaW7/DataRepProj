import PetItem from "./petitem";

const Pets = (props) => {
    return props.myPets.map(
        (pet) => {
            return <PetItem mypet={pet} key={pet._id} Reload={props.ReloadData} />; // returns pet data and reloads
        }
    );
}

export default Pets;
