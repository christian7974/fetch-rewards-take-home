interface DogScreenHeaderProps {
    dogSearchResults: any;
    handleLogOut: (event: React.FormEvent<HTMLFormElement>) => void;
    handleNextPageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handlePrevPageClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DogsScreenHeader({dogSearchResults, handleLogOut, handleNextPageClick, handlePrevPageClick}: DogScreenHeaderProps) {
    return (
    <div>
        <h1>Dogs Screen</h1>
                <form onSubmit={handleLogOut}>
                    <button type="submit">log out</button>
                </form>
                {dogSearchResults?.next && <button onClick={handleNextPageClick}>Next page</button>}
                {dogSearchResults?.prev && <button onClick={handlePrevPageClick}>Previous page</button>}
    </div>
    );
}