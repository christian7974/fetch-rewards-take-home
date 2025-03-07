// Const value to represent the maximum number of dogs to be shown
export const PAGE_SIZE = 12;

/**
 * Method to return every dog breed in the database
 * @returns list of dog breeds
 */
export async function fetchBreeds() {
    const response = await fetch(`${process.env.BASE_URL}/dogs/breeds`, {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) {
        const data = await response.json();

        return data;


    } else {
        console.error("Failed to fetch breeds");
    }
}

/**
* Function that fetches the dog search results (stored as a QueryResult object)
*/
export async function fetchDogSearch(searchParams: SearchParameters) {
    // add the parameters to the search results here
    if (searchParams.size === undefined) {
        searchParams.size = PAGE_SIZE;
    }
    const params = new URLSearchParams(searchParams as any);
    const baseURL = `${process.env.BASE_URL}/dogs/search`;
    const url = `${baseURL}?${params.toString()}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch breeds");
        }
    } catch (error) {
        console.error("Error fetching breeds:", error);
    }
}

/**
 * Function to retrieve the list of dogs from the search
 * @param dogIdArray array of dog ids from the search
*/
export async function fetchDogs(dogIdArray: string[]) {
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
            return (sortedDogs);
        } else {
            console.error("Failed to fetch dogs");
        }
    } catch (error) {
        console.error("Error fetching dogs:", error);
    }
}

/**
 * 
 * @param formData the data from the search form
 * @returns an object containing the search parameters and their values to be used in the search
 */
export function processSearchForm(formData: FormData) {
    const sortDataGroup = formData.get('sort_by') as string;
    const sortOrder = formData.get('sort_order') as string;
    var sortString = "";
    if (sortDataGroup && sortOrder) {
        sortString = `${sortDataGroup}:${sortOrder}`;
    } if (sortDataGroup && !sortOrder || !sortDataGroup && sortOrder) {
        throw new Error("Make sure to select what to sort by and the order.");
    }

    const ageMinStr = formData.get('ageMin') as string;
    const ageMaxStr = formData.get('ageMax') as string;

    const ageMin = ageMinStr ? parseInt(ageMinStr) : undefined;
    const ageMax = ageMaxStr ? parseInt(ageMaxStr) : undefined;

    if (ageMinStr && ageMin !== undefined && isNaN(ageMin)) {
        throw new Error("Minimum age must be a number");
    }

    if (ageMaxStr && ageMax !== undefined && isNaN(ageMax)) {
        throw new Error("Maximum age must be a number");
    }

    if (ageMin && ageMax && ageMin > ageMax) {
        throw new Error("Minimum age must be less than maximum age");
    }

    const zipCodesList = formData.get('zipCodes') as string;
    const zipCodes = zipCodesList ? zipCodesList.split('\n') : [];
    for (var i = 0; i < zipCodes.length; i++) {
        const zipCode = zipCodes[i].trim(); // incase the user adds a space before/after zip code
        if (zipCode.length !== 5) {
            throw new Error("Zip codes must be 5 digits long");
        }
        const zipCodeNumber = Number(zipCode);
        if (isNaN(zipCodeNumber)) {
            throw new Error(`Invalid zip code: ${zipCode}`);
        }
        
    }

    const breedsList = formData.getAll('breed') as string[];
    const size = parseInt(formData.get('numReturn') as string);
    const searchParams: SearchParameters = {};
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

    return searchParams;
}

/**
 * 
 * @param favoritedDogIds the list of dog ids that the user has favorited
 * @returns the matched dog id as a string
 */
export async function matchDogs(favoritedDogIds: string[]) {
    const response = await fetch(`${process.env.BASE_URL}/dogs/match`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(favoritedDogIds),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error("Failed to match dogs");
    }
}

/**
 * Utility function to retrieve a single dog by its id
 * @param dogId the dogId to be fetched 
 * @returns the result of the API to be used as a Dog object
 */
export async function fetchDogById(dogId: string) {
    const response = await fetch(`${process.env.BASE_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        // body is the array of dog ids from the search
        body: JSON.stringify([dogId]),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}