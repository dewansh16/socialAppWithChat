#!/bin/bash

# Replace the <EC2_PUBLIC_IP> with the public IP of your EC2 instance
SERVER_IP=13.233.37.191

# Stop and remove the existing container
sudo docker stop uttertalev1
sudo docker rm uttertalev1

# Pull the latest image from Docker Hub
sudo docker pull uttertale/uttertalev1:22-5-23

# Start a new container
sudo docker run -d --name uttertalev1 --restart always -p 80:8000 -p 443:8000 uttertale/uttertalev1:22-5-23

# Wait for the container to start
sleep 5

# Check if the container is running
if sudo docker ps | grep -q uttertalev1; then
  echo "Deployment successful! Your application is now running on http://${SERVER_IP}"
else
  echo "Deployment failed!"
fi
