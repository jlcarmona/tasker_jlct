FROM openjdk:8-jdk-alpine

WORKDIR /var/tasker-api

ADD target/tasker-api-1.0-SNAPSHOT.jar /var/tasker-api/tasker-api.jar
ADD config.yml /var/tasker-api/config.yml

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "tasker-api.jar", "server", "config.yml"]
