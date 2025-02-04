import { PAGE_SIZE } from "../dogsScreen/helperFunctions"

interface SearchComponentProps { 
    handleNewSearch: (e: React.FormEvent<HTMLFormElement>) => void,
    dogBreeds: string[],
    numDogsToReturn: number,
    updateNumDogsToReturn: (num: number) => void
}

export default function SearchComponent({ handleNewSearch, dogBreeds, numDogsToReturn, updateNumDogsToReturn }: SearchComponentProps) {
    return (
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
            <div>
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
    </div>)
}