export const PAGE_SIZE = 12;

/**
 * 
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
export async function fetchDogSearch(searchParams: searchParameters) {
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
            return(sortedDogs);
        } else {
            console.error("Failed to fetch dogs");
        }
    } catch (error) {
        console.error("Error fetching dogs:", error);
    }
}

export function processSearchForm(formData: FormData) {
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