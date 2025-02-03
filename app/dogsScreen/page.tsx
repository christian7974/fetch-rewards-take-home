"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import IndividualDog from "../components/IndividualDog";
import { fetchBreeds, fetchDogs, fetchDogSearch, PAGE_SIZE, processSearchForm } from "./helperFunctions";
export default function dogsScreen() {

    // Const value to represent the maximum number of dogs to be shown

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    // list of dog breeds
    const [dogBreeds, setDogBreeds] = useState([]);

    // the object that has the results of the search query
    const [dogSearchResults, updateDogSearchResults] = useState<QueryResult>();

    // list of dogs that resulted from the query (dogSearchResults.resultIds)
    const [dogs, setDogs] = useState<Dog[]>([]);

    // array containing user's favorited dogs
    const [favoritedDogs, updateFavoritedDogs] = useState<Dog[]>([]);

    // dog that the user matches with
    const [matchedDog, updateMatchedDog] = useState<Dog>();

    // object that holds search queries object
    const [searchQueries, updateSearchQueries] = useState<searchParameters>({});

    const [numDogsToReturn, updateNumDogsToReturn] = useState(PAGE_SIZE);

    const [fromPointer, updateFromPointer] = useState(0);

    /**
     * Function to log the user out of the app
     * 
     * @param event event from submitting the form
     */
    async function handleLogOut(event: any) {
        event.preventDefault();
        const response = await fetch(`${process.env.BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        router.push("/");
    }


    useEffect(() => {
        /**
         * Function that fetches the dog breeds
         */
        async function getBreeds() {
            try {
                const data = await fetchBreeds();
                setDogBreeds(data);
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        }
        getBreeds();

    }, []);

    // get the object from the dogs/search endpoint
    useEffect(() => {
        async function getDogSearchResults(searchQueries: searchParameters) {
            try {
                const data = await fetchDogSearch(searchQueries);
                updateDogSearchResults(data);
            } catch (error) {
                console.error("Error fetching dog search results:", error);
            }
        }

        getDogSearchResults(searchQueries);
    }, [searchQueries]);

    // using the dog ids, actually get the dogs
    useEffect(() => {
        async function getDogs(dogIdArray: string[]) {
            try {
                const data = await fetchDogs(dogIdArray);
                setDogs(data);
            } catch (error) {
                console.error("Error fetching dogs:", error);
            }
        }
        if (dogSearchResults && dogSearchResults.resultIds.length > 0) {
            // pass in ONLY the dog ids from the QueryResult object
            getDogs(dogSearchResults.resultIds);
        }
    }, [dogSearchResults?.resultIds]);

    function handleNewSearch(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        updateFromPointer(0); // when we do a new search, reset the from pointer
        const searchParams = processSearchForm(formData);
        updateSearchQueries(searchParams);


    }

    function handleNextPageClick() {
        updateFromPointer(prevFromPointer => {
            const newFromPointer = prevFromPointer + PAGE_SIZE;
            updateSearchQueries({ ...searchQueries, from: newFromPointer });
            return newFromPointer;
        });
    }

    function handlePrevPageClick() {
        if (fromPointer != 0) {
            updateFromPointer(prevFromPointer => {
                const newFromPointer = prevFromPointer - PAGE_SIZE;
                updateSearchQueries({ ...searchQueries, from: newFromPointer });
                return newFromPointer;
            });
        }
    }

    function handleDogClick(selectedDog: Dog) {
        var newFavoritedList = [];
        if (favoritedDogs.includes(selectedDog)) {
            newFavoritedList = favoritedDogs.filter((dog) => dog !== selectedDog);
            updateFavoritedDogs(newFavoritedList);
            return;
        }
        updateFavoritedDogs([...favoritedDogs, selectedDog]);
    }

    async function handleFavoritedClick() {
        const favoritedDogIds = favoritedDogs.map((dog) => dog.id);
        const matchedDogResponse = await fetch(`${process.env.BASE_URL}/dogs/match`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(favoritedDogIds),
        });
        if (matchedDogResponse.ok) {
            const matchedDogId = await matchedDogResponse.json();
            const response = await fetch(`${process.env.BASE_URL}/dogs`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                // body is the array of dog ids from the search
                body: JSON.stringify([matchedDogId.match]),
            });
            if (response.ok) {
                const favoritedDog = await response.json();
                updateMatchedDog(favoritedDog[0]);
            }
        }
    }

    return (
        <div className="items-center justify-items-center min-h-screen p-8 pb-20">
            <main className="items-center justify-items-center">
                <h1>dogsScreen</h1>
                <h1>from pointer: {fromPointer}</h1>
                <form onSubmit={handleLogOut}>
                    <button type="submit">log out</button>
                </form>
                {dogSearchResults?.next && <button onClick={handleNextPageClick}>Next page</button>}
                {dogSearchResults?.prev && <button onClick={handlePrevPageClick}>Previous page</button>}
                <div className="bg-blue-400">
                    <form onSubmit={handleNewSearch} className="grid grid-cols-2 gap-4">
                        {/* multiple breeds */}
                        <label className="text-black">Select Breed</label>
                        <select className="text-black" name="breed" id="breed" multiple>
                            {dogBreeds.map((breed) => {
                                return (
                                    <option key={breed}>{breed}</option>
                                )
                            })}
                        </select>

                        {/* multiple zipCodes */}
                        <label>Zip Codes (Enter zip codes on their own lines)</label>
                        <textarea className="text-black" name="zipCodes" id="zipCodes"></textarea>

                        {/* ageMin */}
                        <label className="text-black">Min Age</label>
                        <input className="text-black" id="ageMin" name="ageMin"></input>

                        {/* ageMax */}
                        <label className="text-black">Max Age</label>
                        <input className="text-black" id="ageMax" name="ageMax"></input>

                        {/* amount of results (size) */}
                        <label className="text-black">Results to Return: {numDogsToReturn}</label>
                        <input type="range" min={1} max={PAGE_SIZE} id="numReturn" name="numReturn" value={numDogsToReturn} onChange={(e) => updateNumDogsToReturn(parseInt(e.target.value))}></input>

                        {/* from (paginating results [optional]) */}

                        {/* choose to sort by breed, name or age */}
                        <div >
                            <p>Sort by:</p>
                            <div className="grid grid-cols-2">
                                <label>Breed</label>
                                <input type="radio" name="sort_by" value="breed"></input>

                                <label>Name</label>
                                <input type="radio" name="sort_by" value="name"></input>

                                <label>Age</label>
                                <input type="radio" name="sort_by" value="age"></input>

                                <label>Ascending Order</label>
                                <input type="radio" name="sort_order" value="asc"></input>

                                <label>Descending Order</label>
                                <input type="radio" name="sort_order" value="desc"></input>
                            </div>
                        </div>
                        <button type="submit" className="text-black">find dog</button>
                    </form>
                </div>
                <div className="grid grid-cols-4 gap-4 bg-green-200">
                    {dogs.map((dog) => {
                        return (
                            <div key={dog.id} onClick={() => handleDogClick(dog)}>
                                <IndividualDog {...dog} />
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-4 gap-4 bg-purple-200">
                    {favoritedDogs.map((dog) => {
                        return (
                            <div key={dog.id} onClick={() => handleDogClick(dog)}>
                                <IndividualDog {...dog} />
                            </div>
                        )
                    })}
                </div>
                {favoritedDogs.length > 0 && <button onClick={() => handleFavoritedClick()}>Get Match</button>}

                {matchedDog && <IndividualDog {...matchedDog} />}

            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}