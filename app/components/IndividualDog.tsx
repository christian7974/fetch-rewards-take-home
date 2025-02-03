export default function IndividualDog(dog: Dog) {
    const textSize = "xl";

    return (
        <div className="bg-red-500 w-100% rounded justify-items-center items-center">
            <p className={`text-${textSize}`}>{dog.name}</p>
            <p className={`text-${textSize}`}>{dog.age} years old</p>
            <p className={`text-${textSize}`}>{dog.breed}</p>
            <p className={`text-${textSize}`}>{dog.zip_code}</p>
            <img src={dog.img} className="h-16"/>
        </div>
    );
}