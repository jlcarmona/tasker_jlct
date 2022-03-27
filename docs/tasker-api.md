# Tasker REST API

## Table of contents

- [Tasker REST API](#tasker-rest-api)
  - [Table of contents](#table-of-contents)
  - [About Tasker API](#about-tasker-api)
  - [Repository structure](#repository-structure)
  - [Installation / building](#installation--building)
  - [Usage](#usage)
  - [Running the tests](#running-the-tests)
  - [Test coverage](#test-coverage)
  - [Containerization](#containerization)


## About Tasker API

Tasker API is the project that exposes a REST API to manage the CRUD operations for the tasks. The project has been developed using [Dropwizard](https://www.dropwizard.io/) and the in-memory [H2 database](https://www.h2database.com/html/main.html) for the persistence layer. 

The application runs inside an embedded Jersey server using Jackson as object serializer/deserializer.

## Repository structure
```

├───src
│   ├───main
│   │   ├───java
│   │   │   └───com
│   │   │       └───jlct
│   │   │           └───taskerapi
│   │   │               ├───api
│   │   │               ├───db
│   │   │               └───resources
│   │   └───resources
│   └───test
│       └───resources
│           ├───fixtures
│           └config_test.yml
├───.dockerignore
├───.gitignore
├───config.yml
├───pom.xml
├───run-tasker-api.bat
└───config.yml

```

The main items inside src folder are:

* **api**: it contains the Entity definition used in the CRUD operations.
* **db**: folder containing classes used for persistence operations. In our case it includes TaskDAO.
* **resources**: this folder contains classes which models the resources exposed in our REST API.
* **test**: this folder contains test classes.
* **config.yml**: YAML file which defines the configuration for testing purposes, used by the Dropwizard framework(db connection definition, log definition, ...).

The main items in the root folder are:

* **config.yml**: YAML file which defines the configuration used by Dropwizard framework (db connection definition, log definition, ...).
* **.dockerignore**: used for docker to exclude folders and fields when generating the docker image (similar to .gitignore)
* **run-tasker-api.bat**: script that create a docker image and run the project inside of it.
* **pom.xml**: it is an XML file that contains information about the project and configuration details used by Maven to build the project.

## Installation / building

For installing / building the project we need to have installed properly the following tools.

- Git
- JDK 11 ([Oracle's JDK](https://www.oracle.com/es/java/technologies/javase/jdk11-archive-downloads.html) or [OpenJDK](https://openjdk.java.net/))
- [Apache Maven](https://maven.apache.org/)

Once we have the environment setup, we can run the following command from the root folder.

```script
mvn clean install
```
This command will download the dependencies, build the project and generate a .jar in the target folder which will be also copied in the .m2 folder.

## Usage

Once installed and build the project, you can run the project following the next steps:

- Open a terminal 
- Navigate to the tasker-api application root
- Build/install the project following the steps explained in the previous section
- Run the command:

```script
java -jar target/tasker-api-1.0-SNAPSHOT.jar serve config.yml
```

Doing this, the server will expose the REST API on port 8080 and an admin app on port 8081. The root path for consuming the REST API will be:

```script
http://localhost:8080
```

## Running the tests

The tests for this projects are stored inside src/test. They were implemented using Junit 5, AsserJ and the dropwizard-testing module. 

To run the tests you can follow the next steps: 

- Open a terminal 
- Navigate to the tasker-api application root
- Run the command:

```script
mvn test
```

## Test coverage

As part of the project, a tool to measure the test coverage was added. The tool chosen was [Jacoco](https://www.jacoco.org/). This tool allows the measure of test coverage generating a  report in different format inside of our project (under **target/site/jacoco** folder).

This tool run at the same time that the test runs, you don't have to run additional scripts. Jacoco has been set up adding it to the pom.xml file inside the plugins tag.

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.7</version>
    <executions>
        <execution>
            <id>prepare-agent</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

## Containerization

As part of the project, a folder with the Dockerfile for this projects was included (under **infrastructure/docker-tasker-api**). 

This Dockerfile has the definition to create a Docker image with the tasker-api application deployed. I also included a script to create the image and run the application inside it.

To run the scripts is important to do it **from the root of the project**. This is necessary in order the script to run properly and because in that way, Docker can use the .dockerignore file to not include unnecessary resources. The steps to run the script are: 

- Open a terminal 
- Move to the root folder of the project /tasker-api/
- Navigate to the tasker-api application root folder
- Run the script

```script
run-tasker-api.bat
```

If you want to **create the Docker image** you can run the following command from the tasker-api application root folder

```script
docker build -f ../infrastructure/docker-tasker-api/Dockerfile . -t tasker-api
```

Once the image was create you can run the tasker-api application inside a Docker container using:

```script
docker run -it -p 8080:8080 --name tasker-api tasker-api
```
This will expose the application on port 8080.

<br/>
<br/>

[Go to main page](../README.md)