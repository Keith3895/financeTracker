# Finance Tracker WebApplication
![Build](https://img.shields.io/badge/Build-building-red.svg)

[![Node](https://img.shields.io/badge/node-9.6.1-green.svg)](https://nodejs.org/en/) [![npm](https://img.shields.io/badge/npm-5.8.0-red.svg)](https://www.npmjs.com/) [![MongoDb](https://img.shields.io/badge/mongo_DB-3.6.3-green.svg)](https://www.mongodb.org) [![angular-cli](https://img.shields.io/badge/angular_cli-1.7.2-ff0000.svg)](https://angular.io/) [![Cordova](https://img.shields.io/badge/Cordova-8.0.0-ff69b4.svg)](https://cordova.apache.org/)

----
### Project Brief:
The project is a transaction tracking application. The application when run on a phone will analyze the users text messages and categorize the transactional messages. 

The plan of the project is to make the application intelligent enough to predict the *budget* and the *expected expenditure* and apply more statistical models to achieve greater intelligence and analytics.


**for simple setup run** ``$ npm run preparer``

The web application is divided into three section.

1. **NodeJS**(backend rest service). the root directory has all the node code.
2. **Angular Application**(frontend application). all the source for this application is in the [angular Files](./angularFiles) folder.
3. **Mobile Application**. the source for mobile application is in [mobileApp](./mobileApp) folder.

### Prerequsites to run the application.
The following tools and frameworks should be installed to run the application.
- Node.js.
- Mongo DB.
- Angular.
- Cordova.
- Android Studio.
## Steps To Run Node Application.
* setup ``.env`` file.
* content of env file must have.
```
# a Salt for bcrypt
salt = 'financeAPP'
# port to run the appliction on.
PORT = 4000
port = 4000
# mongo instance link.
mongodb = 'mongodb://localhost/financeAPP'
```

## To Build Angular application. [Readme.md](./angularFiles/README.md)

#### Development server

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* To Change the port run ```ng serve -port [Port number]```

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## To Make Mobile Application. [Readme.md](./mobileApp/README.md) 

#### Prepare Cordova project
To prepare Cordova project run ```cordova prepare```.

#### Build Application.(android)
* you will have to prepare the Cordova project first.
* To build the application run the command ```npm run android```.
* if the previous command didn't work then:
    * switch to [../angularFiles](../angularFiles).
    * run ```npm run build```.
    * switch back to [./mobileApp](./mobileApp).
    * run ```cordova build android```


### contact information:
* [email](mailto:keith30895@gmail.com)
* [linked-in](https://www.linkedin.com/in/keith-franklin-04b57379/)

## To Contribute raise issues and make necessary pull requests.
