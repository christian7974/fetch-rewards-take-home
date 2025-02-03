interface searchParameters {
    breeds?: string[]
    zipCodes?: string[]
    ageMin?: number
    ageMax?: number

    size?: number
    from?: number // which id to start at if list is larger than 25
    sort?: string
}