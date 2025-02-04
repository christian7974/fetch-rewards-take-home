interface DogScreenHeaderProps {
    dogSearchResults: any;
    handleLogOut: (event: React.FormEvent<HTMLFormElement>) => void;
    handleNextPageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handlePrevPageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DogsScreenHeader({ dogSearchResults, handleLogOut, handleNextPageClick, handlePrevPageClick }: DogScreenHeaderProps) {
    const pageButtonStyle = "bg-[#F0E68C] hover:bg-[#C7B51A] active:bg-[#F1E793] text-onyx py-2 px-4 rounded";

    return (
        <div className="items-center justify-items-center pb-4 flex flex-col gap-y-4">
            <h1 className="text-3xl pb-5">Welcome, Let's Begin!</h1>
            <h2 className="text-2xl text-center">Start favoriting some dogs by clicking on them to get started!</h2>
            <form onSubmit={handleLogOut}>
                <button type="submit" className="bg-[#bbf7d0] hover:bg-[#7FF0A7] active:bg-[#B6F6CD] rounded text-onyx py-2 px-4">Log Out</button>
            </form>
            <div className="flex gap-x-2">
                {<button onClick={handlePrevPageClick} className={`${pageButtonStyle} ${dogSearchResults?.prev ? "visible" : "invisible"}`}>Previous Page</button>}
                <button onClick={handleNextPageClick} className={`${pageButtonStyle} ${dogSearchResults?.next ? "visible" : "invisible"}`}>Next Page</button>
            </div>
        </div>
    );
}