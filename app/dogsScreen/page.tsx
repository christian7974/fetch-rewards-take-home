"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IndividualDog from "../components/IndividualDog";

export default function dogsScreen() {

    // Const value to represent the maximum number of dogs to be shown
    const PAGE_SIZE = 12;

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    // list of dog breeds
    const [dogBreeds, setDogBreeds] = useState([]);

    // the object that has the results of the search query
    const [dogSearchResults, updateDogSearchResults] = useState<QueryResult>();

    // list of dogs that resulted from the query (dogSearchResults.resultIds)
    const [dogs, setDogs] = useState<Dog[]>([]);

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
        if (response.status === 200) {

        }
    }

    useEffect(() => {
        /**
         * Function that fetches the dog breeds
         */
        async function fetchBreeds() {
            const response = await fetch(`${process.env.BASE_URL}/dogs/breeds`, {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();

                setDogBreeds(data);


            } else {
                console.error("Failed to fetch breeds");
            }
        }

        fetchBreeds();

    }, []);

    // get the object from the dogs/search endpoint
    useEffect(() => {
        /**
         * Function that fetches the dog search results (stored as a QueryResult object)
         */
        async function fetchDogsSearch(searchParams: searchParameters) {
            // add the parameters to the search results here
            if (searchParams.size === undefined) {
                searchParams.size = PAGE_SIZE;
            }
            const params = new URLSearchParams(searchParams as any);
            const baseURL = `${process.env.BASE_URL}/dogs/search`;
            const url = `${baseURL}?${params.toString()}`;
            console.log(url);
            try {
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    updateDogSearchResults(data);
                } else {
                    console.error("Failed to fetch breeds");
                }
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        }

        fetchDogsSearch(searchQueries);
    }, [searchQueries]);

    // using the dog ids, actually get the dogs
    useEffect(() => {
        /**
         * Function to retrieve the list of dogs from the search
         * @param dogIdArray array of dog ids from the search
         */
        async function fetchDogs(dogIdArray: string[]) {
            console.log(dogSearchResults?.next);
            try {
                const response = await fetch(`${process.env.BASE_URL}/dogs`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // body is the array of dog ids from the search
                    body: JSON.stringify(dogIdArray),
                });

                if (response.ok) {
                    const data = await response.json();
                    const sortedDogs = data.sort((a: Dog, b: Dog) => a.breed.localeCompare(b.breed));
                    setDogs(sortedDogs);
                } else {
                    console.error("Failed to fetch dogs");
                }
            } catch (error) {
                console.error("Error fetching dogs:", error);
            }
        }
        if (dogSearchResults && dogSearchResults.resultIds.length > 0) {
            // pass in ONLY the dog ids from the QueryResult object
            fetchDogs(dogSearchResults.resultIds);
        }
    }, [dogSearchResults?.resultIds]);

    function handleNewSearch(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        updateFromPointer(0); // when we do a new search, reset the from pointer
        const sortDataGroup = formData.get('sort_by') as string;
        const sortOrder = formData.get('sort_order') as string;
        var sortString = "";
        if (sortDataGroup && sortOrder) { 
            sortString = `${sortDataGroup}:${sortOrder}`;
        }

        const ageMin = formData.get('ageMin') ? parseInt(formData.get('ageMin') as string) : undefined;
        const ageMax = formData.get('ageMax') ? parseInt(formData.get('ageMax') as string) : undefined;

        const zipCodesList = formData.get('zipCodes') as string;
        const zipCodes = zipCodesList ? zipCodesList.split('\n') : [];

        const breedsList = formData.getAll('breed') as string[];
        const size = parseInt(formData.get('numReturn') as string);
        const searchParams: searchParameters = {};
        searchParams.from = fromPointer;
        console.log("from poitner at start of search", fromPointer);
        if (ageMin !== undefined) {
            searchParams.ageMin = ageMin;
        }
        if (ageMax !== undefined) {
            searchParams.ageMax = ageMax;
        }
        if (size !== undefined) {
            searchParams.size = size;
        }
        if (breedsList.length > 0) { 
            searchParams.breeds = breedsList;
        }
        if (sortString !== "") {
            searchParams.sort = sortString;
        }
        if (zipCodes.length > 0) {
            searchParams.zipCodes = zipCodes;
        }
        updateSearchQueries(searchParams);
    }

    function handleNextPageClick() {
        updateFromPointer(prevFromPointer => {
            const newFromPointer = prevFromPointer + PAGE_SIZE;
            updateSearchQueries({...searchQueries, from: newFromPointer});
            return newFromPointer;
        });        
    }

    function handlePrevPageClick() {
        updateFromPointer(prevFromPointer => {
            const newFromPointer = prevFromPointer - PAGE_SIZE;
            updateSearchQueries({...searchQueries, from: newFromPointer});
            return newFromPointer;
        });
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
                <div className="grid grid-cols-4 gap-4">
                    {dogs.map((dog) => {
                        return (
                            <div key={dog.id}>
                                <IndividualDog {...dog} />
                            </div>
                        )
                    })}
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}