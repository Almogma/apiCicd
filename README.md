# User-Guide : Web API using TDD and CICD
This project is part of academic course - Project management in [SCE - Shamoon College of Engineering](https://sce.ac.il).

This project is an example for interacting with an external web API using TDD and CICD development methods.
It includes two features that interact with the “themoviedb” API and output a filtered list.
One is a list of movies, sorted by popularity and adhere to given date parameters,
The other is a similar array of movie titles, this time sorted by user rankings.
Each feature is built with five test cases in mind, with each case testing a specific aspect of the feature.
 

#### Getting Started

Needed desktop programs: JetBrains WebStorm, GitHub desktop(for full repository access), Node JS.
Used library repository: NPM
OS: MacOS\Windows 10 x64
Environment: Install needed NPM libraries and make sure you have the latest Node JS package. Our preferred IDE is WebStorm by JetBrains.


### Prerequisites

system requirements:

* https://www.jetbrains.com/webstorm/download/download-thanks.html
* https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi
* https://www.npmjs.com/
* https://git-scm.com/download/win

Open folder for this project and clone this repository use follow command:
```
git clone git@github.com:yanivbenzvi/apiCicd.git

<<<<<<< HEAD
Click [here](http://foo.com) to go somewhere.
=======
```

After nodeJs installion, open cmd and navigate to project folder and run the follow command.:
```
npm install my_dep --save
```

### Features

YearsAndPopularity - Input specific date range (YYYY-MM-DD format) and popularity index 
(0 - 1000).
A list of relevant and sorted (descending) movie titles will be printed.

YearsAndRating - Input specific date range and average vote parameters (0 - 100).
A list of relevant and sorted  (ascending) movie titles will be printed.

Default date range: (1/1/2015) - (31/12/2020)
Default popularity index: 50
Default vote average: 5


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
                ├── mocj.json
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
npm test
or
shift + F10
```
## Authors

- **[Yaniv Ben Zvi](https://github.com/yanivbenzvi)** 
- **[Boris Leviken](https://github.com/Borisl90)** 
- **[Aharon Paz](https://github.com/Ronni3p)**
>>>>>>> cb1a35b154cc239b6d683a17dfac5cddec3ada8e
