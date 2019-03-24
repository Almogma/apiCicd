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

```

After nodeJs installion, open cmd and navigate to project folder and run the follow command.:
```
npm install my_dep --save
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
                ├── mocj.json
            ├── movieFeature.spec.js
├── requirements.txt                    // Project requirements - installation by python pip.
├── .gitignore                          // Files to not track in git.
```
#Running the test

This project contain unit test for every method we use.
The tests is based on analytic solution.
In order to run the tests we used Pycharm ide.
```
test folder > right click > Run 'nosetest in test'
or
ctrl + shift + F10
```
## Authors

- **[Yaniv Ben Zvi](https://github.com/yanivbenzvi)** 
- **[Boris Leviken](https://github.com/Borisl90)** 
- **          **

##Acknowledgments
