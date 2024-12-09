import PetItem from "./petitem";

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
