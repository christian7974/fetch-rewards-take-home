# Fetch Rewards Take Home Assessment
This is the Fetch Rewards Take Home Assessment for the Frontend Developer position. 

I understand that there are a lot of commits, and that some (if not most) of them are pretty trivial and could have been combined into a larger commit. I like to write code like this so that if something goes wrong down the line, I can have a bookmark of where I was and it does not undo too much code that I have written previously. I acknowledge that it may be frustrating on a larger team to have a lot of commits, however that is something that I would definitely talk to my potential team about formatting commits/push etiquette (as well as any other coding etiquette/quirks that the team may have). 

Access the website [here](https://fetch-rewards-take-home-eight.vercel.app).

# Table of Contents
- [Time Spent on Assessment](#time-spent-on-assessment)
- [Technologies Used](#technologies-used)
- [Setting up Development Environment](#set-up-development-environment)
- [Design Choices](#design-choices)
- [Challenges I Came Across](#challenges-i-came-across)

## Time Spent on Assessment:
- Feb 3rd - 8 hours
- Feb 4th - 2.5 hours

## Technologies Used
- Next.js with TypeScript (Framework/language that I am the most comfortable with and one that I have used before)
- APIs provided to me by Fetch Rewards
- Fetch API
- Tailwind CSS for styling components
- [coolors.co](https://coolors.co/) to help picking color palettes
- [Fontshare](https://www.fontshare.com/fonts/satoshi) for the Satoshi font
- Vercel to host the project

## Set Up Development Environment

1. Clone the repository by using this command line:
```git clone https://github.com/christian7974/fetch-rewards-take-home.git```
or by downloading the repository as a ZIP file. More instructions on cloning a repository can be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

2. If you are using your terminal, make sure to cd (change directory) into that directory
```cd path_to_cloned_repo```

3. After you confirm that you are in the repository, run ```npm i``` to install all required dependencies.

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
- I did not use a component class as I wanted to try to learn some more HTML tags (I have never used select multiple, radios or ranges in my past projects, so being able to experiment with them has been very helpful).
- Display the Matched Dog within a modal, as the DogsScreen page was getting crammed and to get the user's attention that there is a match.
- Made sure the base URL is located within an .env file since to prevent it from being used from unauthorized people.
- Tried breaking down the pages into smaller, more manageable components so that the main page file is leaner.
- Used a dark background with light dialogues/textboxes to help the contrast. Used dark text within the light components to make it easier to read.
- When designing buttons, would add 3 states (non-active, hover, active) to help the user see when they are clicking on a button or hovering over it, helping with accessibility and overall website appearance. Opted for a darker color on hover, lighter color on active state.
- I used error messages instead of alerts as I feel like too many alerts can hinder the user experience if they keep seeing alerts and having to close them. Whereas with messages, they do not have to close them and they can still see what is wrong.
- One thing that made designing this project a lot easier was that I started designing on smaller devices, and then scaled up to larger devices (as that is also how Tailwind was developed to work as). This made making the web app responsive a lot easier than starting large and working smaller like I have done on my previous projects.

## Challenges I Came Across
- Using the APIs was difficult at first, however using the fetch documentation online helped, especially how to pass bodies in POST methods.
- That being said, I still had trouble passing in arrays of zip codes and dog breeds and the search will not show accurate results if you try to use multiple breeds and zip codes.
- Did not create a lean DogsScreen page (was originally 300+ lines of code). Going forward, I want to try to plan out which components I need to make and how they will interact with eachother more in the future.
- The idea of a pointer to paginate the results was new to me at first. I reread the specifications enough to make sure I understood what was asked and eventually, it clicked. It made going to the next and previous pages a lot more intuitive.
- Did not really throw errors from a function too often in previous projects, but I wanted to make messages that were effective for the user in helping them log in and query results. I would throw an error in my helper functions if something went wrong and then would display that message to the user.
