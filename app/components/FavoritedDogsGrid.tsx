import IndividualDog from "./IndividualDog";

interface FavoritedDogsGridProps {
    favoritedDogs: Dog[];
    handleDogClick: (dog: Dog) => void;
    handleGetMatchClick: () => void;
    matchedDog: Dog | undefined;
}

export default function FavoritedDogsGrid({ favoritedDogs, handleDogClick, handleGetMatchClick, matchedDog }: FavoritedDogsGridProps) {
    return (
        <>
            <div className="grid grid-cols-4 gap-4 bg-pink-200">
                {favoritedDogs.map((dog) => {
                    return (
                        <div key={dog.id} onClick={() => handleDogClick(dog)}>
                            <IndividualDog {...dog} />
                        </div>
                    )
                })}
            </div>

            {favoritedDogs.length > 0 && <button onClick={() => handleGetMatchClick()}>Get Match</button>}

            {matchedDog && <IndividualDog {...matchedDog} />}
        </>
    )
}