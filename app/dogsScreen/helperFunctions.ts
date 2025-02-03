export const PAGE_SIZE = 12;

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