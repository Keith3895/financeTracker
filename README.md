# Finance Tracker WebApplication
![Build](https://img.shields.io/badge/Build-building-red.svg)

[![Node](https://img.shields.io/badge/node-9.6.1-green.svg)](https://nodejs.org/en/) [![npm](https://img.shields.io/badge/npm-5.6.1-red.svg)](https://www.npmjs.com/) [![MongoDb](https://img.shields.io/badge/mongo_DB-3.6.3-green.svg)](https://www.mongodb.org) [![angular-cli](https://img.shields.io/badge/angular_cli-5.6.1-ff0000.svg)](https://angular.io/) [![Cordova](https://img.shields.io/badge/Cordova-8.0.0-ff69b4.svg)](https://cordova.apache.org/)


The web application is divided into three section.

1. **NodeJS**(backend rest service). the root directory has all the node code.
2. **Angular Application**(frontend application). all the source for this application is in the [angular Files](./angularFiles) folder.
3. **Mobile Application**. the source for mobile application is in [mobileApp](./mobileApp) folder.


## To Build Angular appliction. [Readme.md](./angularFiles/README.md)

#### Development server

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* To Change the port run ```ng serve -port [Port number]```

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## To Make Mobile Application. [Readme.md](./mobileApp/README.md) 

#### Prepare Cordova project
To prepare cordova porject run ```cordova prepare```.

#### Build Application.(android)
* you will have to prepare the cordova project first.
* To build the application run the command ```npm run android```.
* if the previous command didn't work then:
    * switch to [../angularFiles](../angularFiles).
    * run ```npm run build```.
    * switch back to [./mobileApp](./mobileApp).
    * run ```cordova build android```


### contact information:
* [email](keith30895@gmail.com)
* [linkedin](https://www.linkedin.com/in/keith-franklin-04b57379/)

## To Contribute raise issues and make necessary pull requests.
