import { PAGE_SIZE } from "../dogsScreen/helperFunctions"

interface SearchComponentProps {
    handleNewSearch: (e: React.FormEvent<HTMLFormElement>) => void,
    dogBreeds: string[],
    numDogsToReturn: number,
    updateNumDogsToReturn: (num: number) => void,
    errorMessage: string | undefined
}

export default function SearchComponent({ handleNewSearch, dogBreeds, numDogsToReturn, updateNumDogsToReturn, errorMessage }: SearchComponentProps) {

    const labelStyle = "text-onyx text-lg pr-4";
    const inputStyle = "text-onyx text-xl";
    const radioStyle = "h-6";

    return (
        <div className="bg-[#B0DAE8] rounded p-4 mb-4 lg:mb-0">
            <form onSubmit={handleNewSearch} className="gap-y-4">
                <div className="grid grid-cols-2 gap-4 p-4">
                    {/* multiple breeds */}
                    <label className={labelStyle}>Select Breed</label>
                    <select className="text-black" name="breed" id="breed" multiple>
                        {dogBreeds.map((breed) => {
                            return (
                                <option key={breed} className="text-md">{breed}</option>
                            )
                        })}
                    </select>

                    {/* multiple zipCodes */}
                    <label className={labelStyle}>Zip Codes (Enter on separate lines)</label>
                    <textarea className={inputStyle} name="zipCodes" id="zipCodes"></textarea>

                    {/* ageMin */}
                    <label className={labelStyle}>Min Age</label>
                    <input className={inputStyle} id="ageMin" name="ageMin"></input>

                    {/* ageMax */}
                    <label className={labelStyle}>Max Age</label>
                    <input className={inputStyle} id="ageMax" name="ageMax"></input>

                    {/* amount of results (size) */}
                    <label className={labelStyle}>Results Per Page: {numDogsToReturn}</label>
                    <input type="range" min={1} max={PAGE_SIZE} id="numReturn" name="numReturn" value={numDogsToReturn} onChange={(e) => updateNumDogsToReturn(parseInt(e.target.value))}></input>
                </div>

                {/* choose to sort by breed, name or age */}
                <div>
                    <p className={labelStyle}>Sort by:</p>
                    <div className="grid grid-cols-3 gap-y-2 xl:grid-cols-3">
                        <div>
                            <label className={labelStyle}>Breed</label>
                            <input type="radio" name="sort_by" value="breed" className={radioStyle}></input>
                        </div>

                        <div>
                            <label className={labelStyle}>Name</label>
                            <input type="radio" name="sort_by" value="name" className={radioStyle}></input>
                        </div>

                        <div>
                            <label className={labelStyle}>Age</label>
                            <input type="radio" name="sort_by" value="age" className={radioStyle}></input>
                        </div>

                        <div>
                            <label className={labelStyle}>Ascending Order</label>
                            <input type="radio" name="sort_order" value="asc" className={radioStyle}></input>
                        </div>

                        <div>
                            <label className={labelStyle}>Descending Order</label>
                            <input type="radio" name="sort_order" value="desc" className={radioStyle}></input>
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-[#b45918] hover:bg-[#7E3E11] active:bg-[#A25016] rounded py-2 px-4">Search</button>
            </form>
            <h1 className="w-full text-center text-red-600 text-lg">{errorMessage}</h1>
        </div>)
}