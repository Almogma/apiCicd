![alt text](https://www.mabl.com/hubfs/CICDBlog.png)

# User-Guide : Web API using TDD and CICD
This project is part of academic course - Project management in [SCE - Shamoon College of Engineering](https://sce.ac.il).

This project is an example for interacting with an external web API using TDD and CICD development methods.
It includes two features that interact with the “themoviedb” API and output a filtered list.
One is a list of movies, sorted by popularity and adhere to given date parameters,
The other is a similar array of movie titles, this time sorted by user rankings.
Each feature is built with five test cases in mind, with each case testing a specific aspect of the feature.
 

#### Getting Started
Project is developed in Node JS environment, under windows operation system.
Used library repository: [NPM](https://npmjs.com)
Environment: Install needed NPM libraries and make sure you have the latest Node JS package. Our preferred IDE is WebStorm by JetBrains.


### Prerequisites

system requirements:

* [NodeJS LTS](https://nodejs.org)
* [NPM](https://www.npmjs.com/)

Open folder for this project and clone this repository use follow command:
```
git clone git@github.com:yanivbenzvi/apiCicd.git
```

After clone the project open terminal and navigate to project folder and run the follow command.:
```
npm install
```

### Features

YearsAndPopularity - Input specific date range (YYYY-MM-DD format) and popularity index 
(0 - 1000).
A list of relevant and sorted (descending) movie titles will be printed.
```
const { pop, rating, fromDate, toDate } = {
        pop: 50,
        rating: 5,
        fromDate: '2015-1-1',
        toDate: '2020-12-31'
    }
 MovieFeature.yearsAndPopluritySearch(movieRatingDateData, rating, fromDate, toDate)
```
Function retrieve:
```
[ { title: 'How to Train Your Dragon: The Hidden World', vote_average: 7.7, release_date: '2019-01-03' },
  { title: 'Captain Marvel', vote_average: 7.3, release_date: '2019-03-06' },
  { title: 'Us', vote_average: 7.3, release_date: '2019-03-14' },
    ...]
```

YearsAndRating - Input specific date range and average vote parameters (0 - 100).
A list of relevant and sorted  (ascending) movie titles will be printed.

Default date range: (1/1/2015) - (31/12/2020)
Default popularity index: 50
Default vote average: 5

```
const { pop, fromDate, toDate } = { fromDate: '2085-1-1', toDate: '2990-12-31' }

MovieFeature.yearsAndRatingSearch(moviePopDateData, pop, fromDate, toDate)```
```
Function retrieve:
```
[ { title: 'How to Train Your Dragon: The Hidden World', popularity: 429.644, release_date: '2019-01-03' },
  { title: 'Captain Marvel', popularity: 373.277, release_date: '2019-03-06' },
  { title: 'Us', popularity: 299.886, release_date: '2019-03-14' },
    ...]
```

### Project Structure 

The tree below displays the main files and folders structure.
```textile                               
├── module                                
    ├── MovieFeatures.js                // 2 features 
├── node_modules                          
├── test                                // test folder
    ├── unit
        ├── unit
            ├── stubs
                ├── mock.json
            ├── movieFeature.spec.js
├── .babelrc
├── .eslintignore
├── .gitignore                         // Files to not track in git.
├── .package-lock.json
├── README.md
```
#Running the test

This project contain unit test 
Each test will run automatically with each push to GitHub, as part of the CICD process.
```
npm run test
```
## Authors

- **[Yaniv Ben Zvi](https://github.com/yanivbenzvi)** 
- **[Boris Leviken](https://github.com/Borisl90)** 
- **[Aharon Paz](https://github.com/Ronni3p)**
