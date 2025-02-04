/**
 * searchParameters query to be used when the user wants to search for a dog
 */
interface SearchParameters {
    breeds?: string[]
    zipCodes?: string[]
    ageMin?: number
    ageMax?: number

    size?: number
    from?: number 
    sort?: string
}