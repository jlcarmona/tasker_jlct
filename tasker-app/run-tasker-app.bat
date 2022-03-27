call npm run build
docker rm tasker-app --force
docker build -f ../infrastructure/docker-tasker-app/Dockerfile.dev . -t tasker-app
docker run -it -p 3000:3000 --name tasker-app tasker-app
