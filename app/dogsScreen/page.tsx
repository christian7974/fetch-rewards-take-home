"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import IndividualDog from "../components/IndividualDog";

export default function dogsScreen() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    // list of dog breeds
    const [dogBreeds, setDogBreeds] = useState([]);

    // the object that has the results of the search query
    const [dogSearchResults, updateDogSearchResults] = useState<QueryResult>();

    // list of dogs that resulted from the query (dogSearchResults.resultIds)
    const [dogs, setDogs] = useState<Dog[]>([]);

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
        async function fetchDogsSearch() {
            try {
                const response = await fetch(`${process.env.BASE_URL}/dogs/search`, {
                    method: "GET",
                    credentials: "include"
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
    
        fetchDogsSearch();
    }, []);

    // using the dog ids, actually get the dogs
    useEffect(() => {
        /**
         * Function to retrieve the list of dogs from the search
         * @param dogIdArray array of dog ids from the search
         */
        async function fetchDogs(dogIdArray: string[]) {
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
                    console.log("the dogs");
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
    }, [dogSearchResults]);


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>dogsScreen</h1>
                <form onSubmit={handleLogOut}>
                    <button type="submit">log out</button>
                </form>
                <p>{errorMessage}</p>
                {dogs.map((dog) => {
                    return (
                        <div key={dog.id}>
                            <IndividualDog {...dog} />
                        </div>
                    )
                })}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    ); 
}