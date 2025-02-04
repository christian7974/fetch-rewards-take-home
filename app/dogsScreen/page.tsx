"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import IndividualDog from "../components/IndividualDog";
import { fetchBreeds, fetchDogById, fetchDogs, fetchDogSearch, matchDogs, PAGE_SIZE, processSearchForm } from "./helperFunctions";
import SearchComponent from "../components/SearchComponent";
import DogsScreenHeader from "../components/DogsScreenHeader";
import AllDogsGrid from "../components/AllDogsGrid";
import FavoritedDogsGrid from "../components/FavoritedDogsGrid";
export default function dogsScreen() {
    const router = useRouter();

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

    async function handleGetMatchClick() {
        const favoritedDogIds = favoritedDogs.map((dog) => dog.id);
        const matchedDogId = await matchDogs(favoritedDogIds);
        const favoritedDog = await fetchDogById(matchedDogId.match);
        updateMatchedDog(favoritedDog[0]);
    }

    return (
        <div className="items-center justify-items-center min-h-screen p-8 pb-20">
            <main className="items-center justify-items-center">
                <DogsScreenHeader
                    dogSearchResults={dogSearchResults}
                    handleLogOut={handleLogOut}
                    handleNextPageClick={handleNextPageClick}
                    handlePrevPageClick={handlePrevPageClick}
                />

                <SearchComponent
                    handleNewSearch={handleNewSearch}
                    dogBreeds={dogBreeds}
                    numDogsToReturn={numDogsToReturn}
                    updateNumDogsToReturn={updateNumDogsToReturn}
                />

                <AllDogsGrid
                    dogs={dogs}
                    handleDogClick={handleDogClick}
                />

                <FavoritedDogsGrid
                    favoritedDogs={favoritedDogs}
                    handleDogClick={handleDogClick}
                    handleGetMatchClick={handleGetMatchClick}
                    matchedDog={matchedDog}
                />


            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}