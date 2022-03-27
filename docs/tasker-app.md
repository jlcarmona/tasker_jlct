# Tasker Web App

## Table of contents

- [Tasker Web App](#tasker-web-app)
  - [Table of contents](#table-of-contents)
  - [About Tasker Web App](#about-tasker-web-app)
  - [Repository structure](#repository-structure)
  - [Installation / building](#installation--building)
  - [Usage](#usage)
  - [Running the tests](#running-the-tests)
  - [Test coverage](#test-coverage)
  - [Containerization](#containerization)


## About Tasker Web App

Tasker Web App is the project that consumes the REST API allowing create, delete, modify and view the tasks. The project has been developed using [React](https://reactjs.org) and runs using Node.js .

## Repository structure
```

├───public
├───src
│   ├───components
│   ├───services
│   ├───styles
│   ├───types
│   └───__test__
├───.dockerignore
├───.gitignore
├───jest.config.ts
├───package.json
├───run-tasker-app.bat
└───tsconfig.json
```

The main items inside src folder are:

* **components**: it contains React components.
* **services**: contains the services responsible for consuming web services
* **types**: this folder contains data entities managed by the application.
* **__test__**: this folder contains test classes.

The main items inside root folder are:

* **package.json**: this file identify the project as well as handle the project's dependencies.
* **.dockerignore**: used for docker to exclude folders and fields when generating the docker image (similar to .gitignore)
* **run-tasker-api.bat**: script that create a docker image and run the project inside of it.
* **jest.config.ts**: Jest's configuration.
* **tsconfig.json**:  indicates that the directory is the root of a TypeScript project

## Installation / building

For installing / building the project we need to have installed the following tools.

- Git
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/)

Once we have the environment setup, you can run the following command from the root folder.

```script
npm install
```
This command will installs a package, and any packages that it depends on. 

## Usage

Once installed and build the project, you can run the project following the next steps:

- Open a terminal 
- Navigate to the tasker-app application root
- Build/install the project following the steps explained in the previous section
- Run the command:

```script
npm run start
```

Doing this, the Web App will be created and deploy into the Node.js server and started on port 3000. The root path for accesing the Web App will be:

```script
http://localhost:3000
```

## Running the tests

The tests for this project are stored inside src/__test__. They were implemented using react testing library and Jest. 

To run the tests you can follow the next steps: 

- Open a terminal 
- Navigate to the tasker-app application root
- Run the command:

```script
npm run test-compile test
```
Some of the tests start a server and run the application using 35000 and 35001 ports. These ports are set by default in the config_test.yml placed in \src\resources\config_test.yml.

## Test coverage

To run the tests coverage script you can follow the next steps: 

- Open a terminal 
- Navigate to the tasker-app application root
- Run the command:

```script
npm run test-compile coverage
```

## Containerization

As part of the project, a folder with dev a and production Dockerfiles for this project was included (under **infrastructure/docker-tasker-app**). 

This Dockerfiles have the definition to create Docker images with the tasker-app application deployed. I also included a script to create the image and run the application inside of it.

To run the scripts is important to do it **from the root of the project**. This is necessary in order for the script to run properly and because in that way, Docker can use the .dockerignore file to not include unnecessary resources. The steps to run the script are: 

- Open a terminal 
- Move to the root folder of the project /tasker-api/
- Navigate to the tasker-api application root folder
- Run the script:

```script
run-tasker-app.bat
```

If you want to **create the Docker image** you can run the following command from the tasker-api application root folder

```script
docker build -f ../infrastructure/docker-tasker-app/Dockerfile.dev . -t tasker-api or 
docker build -f ../infrastructure/docker-tasker-app/Dockerfile.prod . -t tasker-api for production
```

Once the image was created you can run the tasker-app application inside a Docker container using:

```script
docker run -it -p 3000:3000 --name tasker-app tasker-app
```
This will expose the application on port 3000.

<br/>
<br/>

[Go to main page](../README.md)