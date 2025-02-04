import IndividualDog from "./IndividualDog";

interface FavoritedDogsGridProps {
    favoritedDogs: Dog[];
    handleDogClick: (dog: Dog) => void;
    handleGetMatchClick: () => void;
    matchedDog: Dog | undefined;
}

export default function FavoritedDogsGrid({ favoritedDogs, handleDogClick, handleGetMatchClick, matchedDog }: FavoritedDogsGridProps) {
    return (
        <div className="gap-y-4 flex flex-col items-center justify-items-center">
            {favoritedDogs.length > 0 &&
                <button
                    onClick={() => handleGetMatchClick()}
                    className="bg-[#bbf7d0] hover:bg-[#7FF0A7] active:bg-[#B6F6CD] rounded text-onyx py-2 px-4">Get Match</button>}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 bg-pink-200 px-4 py-2 text-center rounded">
                {favoritedDogs.map((dog) => {
                    return (
                        <div key={dog.id} onClick={() => handleDogClick(dog)}>
                            <IndividualDog {...dog} />
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}