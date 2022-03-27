call mvn clean install
docker rm tasker-api --force
docker build -f ../infrastructure/docker-tasker-api/Dockerfile . -t tasker-api
docker run -it -p 8080:8080 --name tasker-api tasker-api
