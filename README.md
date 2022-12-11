# FitLit Starter Kit

FitLit is a proof-of-concept for a fitness tracking web application. The app breaks down a users hydration, sleep patterns, step goal levels, and present it on a dashboard. 

## Technologies and Skills

FitLit uses...
* HTML and CSS adhering to BEM naming conventions.
* Old School Vanilla JavaScript (OSVJS).
* [Charts.js](https://www.chartjs.org/) to visualize weekly data. 
* [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for unit testing.  

## Architecture
FitLit currently uses prototype data found in our `data` folder. Most of the functionality is housed in our `src` folder, which includes all of our classes (ex: `User-Class.js`) as well as our JS logic (`scripts.js`), HTML (`index.html`), and CSS (`styles.css`). We also have a testing suite, housed in our `test` folder.