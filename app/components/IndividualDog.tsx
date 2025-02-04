export default function IndividualDog(dog: Dog) {
    const textSize = "md";

    return (
        <div className={`bg-red-500 w-100% rounded justify-items-center items-center max-w-36 py-2 px-2 cursor-pointer`}>
            <p className={`text-lg font-bold`}>{dog.name}</p>
            <p className={`text-${textSize}`}>{dog.age} years old</p>
            <p className={`text-${textSize} w-3/4 truncate max-h-6`}>{dog.breed}</p>
            <p className={`text-${textSize}`}>{dog.zip_code}</p>
            <img src={dog.img} className="h-20 rounded"/>
        </div>
    );
}