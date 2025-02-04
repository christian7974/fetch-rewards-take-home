import IndividualDog from "./IndividualDog"

interface AllDogsGridProps {
    dogs: Dog[];
    handleDogClick: (dog: Dog) => void;
}

export default function AllDogsGrid({dogs, handleDogClick}: AllDogsGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4 bg-green-200">
            {dogs.map((dog) => {
                return (
                    <div key={dog.id} onClick={() => handleDogClick(dog)}>
                        <IndividualDog {...dog} />
                    </div>
                )
            })}
        </div>
    )
}