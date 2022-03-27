# Tasker

## Table of contents

>* [Tasker](#tasker)
>   * [About Tasker](#about-tasker)
>   * [Repository structure](#repository-structure)
>   * [Installation](#installation)
>   * [Building](#building)
>   * [Deploying the application on Oracle Cloud Infrastructure (OCI) ](#deploying-the-application-on-oracle-cloud-infrastructure)

## About Tasker

Tasker is a web application which allows the management of tasks. It was created using the framework [Dropwizard](https://www.dropwizard.io/) for the backend and [React](https://reactjs.org/) for the frontend.

This Web application is composed by two projects

* [Tasker-api](docs/tasker-api.md) : Rest API managing CRUD operations for Task data
* [Tasker-app](docs/tasker-app.md) : Web application which consumes the Rest API

The Tasker Application is developed and supported by Jose Luis Carmona.

## Repository structure
```
    ├── README.md
    ├───docs
    ├───infrastructure
    ├───tasker-api
    ├───tasker-app
    └───README.md
```
* docs : folder with documentation about tasker 
* infrastructure : folder which includes Dockerfile and dockerignore files to create the docker images
* tasker-api : Rest API project  based on Dropwizard
* tasker-app : Web Application based on React

## Installation

Running the Tasker Application requires JDK 11, Oracle's JDK or OpenJDK (for the API Rest) and Node+NPM for the Web application.

## Building

Building the Tasker Application requires the following tools:

### For tasker-api

- Git
- JDK 11 ([Oracle's JDK](https://www.oracle.com/es/java/technologies/javase/jdk11-archive-downloads.html) or [OpenJDK](https://openjdk.java.net/))
- [Apache Maven](https://maven.apache.org/)

More details about the installation process you can read [Tasker-api building](docs/tasker-api.md#installation--building)

### For tasker-app

- Git
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/)

More details about the installation process you can read [Tasker-app building](docs/tasker-app.md#installation--building)

In case you want to run the Tasker inside a container, you would need [Docker](https://www.docker.com/). Here you can find details about how to dockeraize [tasker-api](https://www.npmjs.com/) and [tasker-app](https://www.npmjs.com/)


## Deploying the application on Oracle Cloud Infrastructure
One of the options that we have is to deploy the application on Oracle Cloud Infrastructure. [Here](docs/deploying-oci.md#deploying-tasker-app-on-oracle-cloud-infrastructure) you can see a proposal of how to deploy the App on an OCI cluster.