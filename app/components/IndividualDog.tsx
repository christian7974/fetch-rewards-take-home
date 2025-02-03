export default function IndividualDog(dog: Dog) {
    return (
        <div className="bg-red-500">
            <p>{dog.name}</p>
            <p>{dog.age} years old</p>
            <p>{dog.breed}</p>
            <p>{dog.zip_code}</p>
            <img src={dog.img} className="w-24"/>
        </div>
    );
}