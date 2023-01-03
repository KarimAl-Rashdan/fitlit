# FitLit

FitLit is a proof-of-concept for a fitness tracking web application. The app breaks down a users hydration, sleep patterns, step goal levels, and present it on a dashboard. It runs in the web browser.
![FitLit gif](https://media.giphy.com/media/NWY49FseE1d6dTUNTu/giphy.gif)

### `How to Use the App:`

- Clone down this repo to your computer
- Access the root folder in your Terminal
- Type `npm install` to install all required dependencies
- Type `npm start` to start local server  
- Paste `http://localhost:8080/` into your web browser to view the application

After the above steps have been followed, please do the following in order to access the data from a local server:

- Clone [this](https://frontend.turing.edu/projects/Fitlit-part-one.html) repo 
- Access the root folder in your Terminal
- Type `npm install` to install all required dependencies
- Type `npm start` to start local server  

### `Technologies and Skills`

FitLit uses...
* HTML and CSS adhering to BEM naming conventions.
* Old School Vanilla JavaScript (OSVJS).
* [Charts.js](https://www.chartjs.org/) to visualize weekly data. 
* [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for unit testing.  

## `Architecture`
FitLit currently uses prototype data found in our `data` folder. Most of the functionality is housed in our `src` folder, which includes all of our classes (ex: `User-Class.js`) as well as our JS logic (`scripts.js`), HTML (`index.html`), and CSS (`styles.css`). We also have a testing suite, housed in our `test` folder.


### `Contributors:`
1. Karim Al-Rashdan
    * [GitHub](https://github.com/KarimAl-Rashdan)
    * [LinkedIn](https://www.linkedin.com/in/karimal-rashdan/)
2. Karrar Qasim
    * [GitHub](https://github.com/KarrarQ)
    * [LinkedIn](https://www.linkedin.com/in/karrar-qasim-b6307024b/)
3. Andrew Cerveny
    * [GitHub](https://github.com/AndrewCerveny)
    * [LinkedIn](https://www.linkedin.com/in/andrewcerveny/)
4. Blanche Haddad
    * [GitHub](https://github.com/BHaddad1)
    * [LinkedIn](https://www.linkedin.com/in/blanche-haddad-denver/)

## `Team Wins:`
- Able to implement Fetch API functionality and successfully import and post data from API.
- Followed Test-driven development principles.
- Achieved accessibility goals

## `Future Iterations:`
- User login
- Display user's friends
- Compare data between user and friends
- Drag and drop widgets
