# CI/CD Pipleline for a Fullstack App

This repository serves to document my process of creating a CI/CD pipeline for a fullstack application hosted on Azure

## Pipeline:
The Pipeline will use the following:
- Jenkins
- Azure
- Docker
- Github
- Dockerhub

# Current Progress
![dev_prog](https://github.com/ausbennett/fullstack-cicd-educational/assets/61357467/76c5ce1a-7b55-4493-9493-7f8f9e18f2c7)


## 1. Fullstack App [ DONE ]
- Completed here: https://github.com/ausbennett/docker-fullstack-volleyball
- Works locally, needs to be adapted for the cloud

## 2. Jenkins Node [ IN PROG ]
- Configure Connection to github
- Build & Push Docker Images
- Test
- Deploy to Azure

## 3. Azure Multi-container App Service [ TODO ]
- Azure does not like how my app is setup currently, feeding it my current working docker-compose.yml and how my app is setup, containers keep crashing on azure servers.
