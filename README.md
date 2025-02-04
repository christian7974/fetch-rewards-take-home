# Fetch Rewards Take Home Assessment
This is the Fetch Rewards Take Home Assessment for the Frontend Developer position.

## Getting Started

1. Clone the repository by using this command line:
```git clone https://github.com/christian7974/fetch-rewards-take-home.git```
or by downloading the repository as a ZIP file. More instructions on cloning a repository can be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. If you are using your terminal, make sure to cd into that directory
```cd path_to_cloned_repo```

3. After you confirm that you are in the repository, run
```npm i``` to install all required dependencies.

4. Depending on whether you use npm, yarn, pnpm or bun, use these commands to run the server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Navigate to this url
```http://localhost:3000/```
and the website will be shown.

## Design Choices
- If the user clears their Favorited Dogs, then the matched dog will not be cleared.
- I did not use a component class as I wanted to try to learn some more HTML tags (I have never used select multiple, radios or ranges in my past projects, so being able to experiment with them has been very helpful).
- Display the Matched Dog within a modal, as the DogsScreen page was getting crammed and to get the user's attention that there is a match.

## Checklist
- [x] User enters name & email
- [x] Bring to page to see available dogs
- [ ] Filtered by breed
- [x] Paginated
- [ ] Sorted by breed alphabetically
- [x] ALL fields except ID present
- [x] Users can select their favorite dogs from search results
- [x] Should generate a match based on their favorited dogs list
