import { useEffect } from "react";

interface MatchedDogModalProps {
    isOpen: boolean;
    onClose: () => void;
    matchedDog: Dog | undefined;
}

export default function MatchedDogModal({ isOpen, onClose, matchedDog }: MatchedDogModalProps) {

    const textSize = "text-xl";
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        } else {
            window.removeEventListener("keydown", handleKeyDown);

        }
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-red-100 p-4 rounded shadow-lg max-w-md w-full text-black text-center items-center justify-items-center">

                <button className="submit-button bg-[#CD7F32] rounded text-lg px-2 py-2 hover:bg-[#945C24] active:bg-[#D38F4A]" onClick={onClose}>Close</button>
                <h1 className={`${textSize}`}>We think that:</h1>
                <h1 className={`${textSize}`}>You and <span className="font-bold">{matchedDog?.name}</span> are perfect for eachother!</h1>
                <img src={matchedDog?.img} alt={matchedDog?.name} className="rounded-lg h-128" />
                <p className={`${textSize}`}>Breed: {matchedDog?.breed}</p>
                <p className={`${textSize}`}>They're waiting for you at {matchedDog?.zip_code}!</p>
            </div>
        </div>)
}