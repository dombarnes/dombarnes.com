---
author: dombarnes
comments: true
date: 2021-04-04 00:28:21+0100
layout: post
slug: azure-docker-compose-and-rails
title: Azure, DevOps, and Docker Compose and Rails
images:
    thumbnail: assets/article_images/2013-02-25-nifty-minidrive/IMG_0001.jpg
tags: 
- featured
- tech
- docker
- docker-compose
- rails
- azure
- devops
image: '/assets/article_images/2013-02-25-nifty-minidrive/IMG_0001.jpg'
twitter_card: summary_large_image
excerpt: Struggling to get Rails running on Azure with Docker? Let me help.
---

Dockerfile  
azure-pipelines  
docker-compose.azure.yml  
Git build numbers  
Deploy and staging sites  
ENV VARS  

### Dockerfile
```Dockerfile
FROM ruby:2.7.1-alpine3.12

RUN apk add --no-cache --update \
  binutils-gold \
  build-base \
  busybox \
  ca-certificates \
  curl \
  file \
  g++ \
  gcc \
  git \
  gnupg1 \
  graphicsmagick \
  inotify-tools \
  less \
  libc-dev \
  libffi-dev \
  libsodium-dev \
  libstdc++ \
  libxml2-dev \
  libxslt-dev \
  libgcrypt-dev \
  linux-headers \
  make \
  netcat-openbsd \
  nodejs \
  openssh-client \
  openssl \
  pkgconfig \
  postgresql-dev \
  postgresql-client \
  python3 \
  tzdata \
  yarn

ARG APP_PATH=/usr/src/app

RUN mkdir -p ${APP_PATH}
WORKDIR ${APP_PATH}

# Gem installation
COPY Gemfile Gemfile.lock ${APP_PATH}/
ARG BUNDLE_GITHUB__COM
RUN bundle config build.nokogiri --use-system-libraries \
  && bundle check \
  || bundle install -j8 --retry 3

COPY package.json yarn.lock ${APP_PATH}/
RUN yarn install --check-files

COPY . ./

EXPOSE 3000
CMD ["bundle", "exec", "rails", "s", "-b", "0.0.0.0"]

```

### docker-compose.azure.yml
```yaml 
version: "3"
services:
  redis:
    image: <your-domain>.azurecr.io/redis:6.0.6-alpine3.12
    restart: always
    command: redis-server /usr/local/etc/redis/redis.conf
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 60s
      timeout: 3s
      retries: 30
    volumes:
      - redis_data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf

  app:
    image: <your-domain>.azurecr.io/docker_service_name:latest
    ports:
      - "80:3000"
    restart: always
    depends_on:
      - redis

  worker:
    image: <your-domain>.azurecr.io/docker_service_name:latest
    entrypoint: sh entrypoints/wait-for redis:6379 -t 45 -- bundle exec sidekiq
    restart: always
    environment:
      - REDIS_URL=redis://redis:6379/0
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    healthcheck: 
      test: ["CMD", "sidekiqmon"]
      interval: 60s
      timeout: 5s
      retries: 15
    depends_on:
      - redis

volumes:
  redis_data:
```

### azure-pipelines.yml
registry authorization
```yaml
# Node.js
# Add steps that analyze code, save build artifacts, deploy, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/javascript

name:  'My Rails App'
trigger:
  - master
  - develop

variables:
  azureContainerRegistry: <your-domain>.azurecr.io
  azureSubscriptionEndpoint: YourSubscriptionEndpoint !!!!! Explain this

pool:
  vmImage: 'ubuntu-latest'

stages:
- stage: BuildDocker
  displayName: Build an updated docker image
  jobs:
  - job: BuildRailsDocker
    steps:
    - bash: |
        short_hash=`git rev-parse --short HEAD`
        echo "##vso[task.setvariable variable=short_hash;isOutput=true]$short_hash"
      workingDirectory: $(Build.SourcesDirectory)
      name: bashShortHash
      displayName: Get short git hash
    - task: DockerCompose@0
      displayName: Container registry login
      inputs:
        containerregistrytype: Azure Container Registry
        azureSubscriptionEndpoint: $(azureSubscriptionEndpoint)
        azureContainerRegistry: $(azureContainerRegistry)
        dockerComposeFile: '**/docker-compose.ci.yml'
        action: 'Run a Docker Compose command'
        dockerComposeCommand: 'version'
    
    - task: DockerCompose@0
      displayName: Build Image
      inputs:
        action: Build services
        containerregistrytype: 'Azure Container Registry'
        azureSubscriptionEndpoint: $(azureSubscriptionEndpoint)
        azureContainerRegistry: $(azureContainerRegistry)
        dockerComposeFile: docker-compose.ci.yml
        dockerComposeCommand: build
        qualifyImageNames: true
        projectName: <your-project-name>
        arguments: '--build-arg RAILS_MASTER_KEY=$(RAILS_MASTER_KEY) --build-arg RAILS_ENV=$(RAILS_ENV) --build-arg AIRBRAKE_PROJECT_ID=$(AIRBRAKE_PROJECT_ID) --build-arg AIRBRAKE_KEY=$(AIRBRAKE_KEY)'
        
    - task: Docker@2
      displayName: Tag Build with short hash
      inputs:
        command: tag
        arguments: <your-domain>.azurecr.io/docker_service_name:latest <your-domain>.azurecr.io/docker_service_name:$(bashShortHash.short_hash)
  
    - task: DockerCompose@0
      displayName: Push services to Azure CR
      inputs:
        action: Push services
        azureSubscriptionEndpoint: $(azureSubscriptionEndpoint)
        azureContainerRegistry: $(azureContainerRegistry)
        dockerComposeFile: docker-compose.ci.yml
        additionalImageTags: $(bashShortHash.short_hash)
        projectName: <your-project-name>
        imageName: '<your-domain>.azurecr.io/docker_service_name:$(bashShortHash.short_hash)'

- stage: PublishContainerSettingsFile
  jobs:
  - job: PublishComposeFileForDeploy
    variables:
      shortHashVar: $[ stageDependencies.BuildDocker.BuildRailsDocker.outputs['bashShortHash.short_hash'] ]
    steps:
    - bash: |
        echo Substituting SHA with $(shortHashVar)
        sed -i  -e "s/%SHA%/$(shortHashVar)/g" docker-compose.azure.template.yml
      workingDirectory: $(Build.SourcesDirectory)
      displayName: Sed SHA replacement
    - bash: |
        cp docker-compose.azure.template.yml $(Build.ArtifactStagingDirectory)/docker-compose.azure.template.yml
      workingDirectory: $(Build.SourcesDirectory)
      displayName: Copy azure template to artifact staging
    - task: PublishPipelineArtifact@1
      displayName: Publish Artifact Staging directory for release pipeline
      inputs:
        pathToPublish: '$(Build.ArtifactStagingDirectory)'
        artifactName: docker-container
```

### Certbot Manual Renewal
- Password from Publish Profile

```shell
#!/bin/bash
DATE=$(date +%Y-%m-%d)
CERT_PW='mycertpassword'
DOMAIN=my.domain.com
PFX="$DOMAIN-$DATE.pfx"
APP_SERVICE=my-appservice-name
FTPUSER='my-appservice-name\my-appservice-name'
FTPPASSWD='my-azure-ftp-password'
FTPHOST=<your-ftp-destination>.ftp.azurewebsites.windows.net
RESOURCE_GROUP=my-resource-group


function printStatus() {
 echo -e "\033[32m -- $1 \033[39m"
}

function printError() {
 echo -e "\033[31m -- $1 \033[39m"
}

function setExternalOutput() {
  echo -e "\033[33m"
}

function resetColor() {
 echo -e "\033[39m" 
}

printStatus "Renewing SSL with Let's Encrypt"
sudo certbot certonly -n -d $DOMAIN --manual --manual-public-ip-logging-ok --manual-auth-hook ./azure_certbot_auth_ftp.sh --manual-cleanup-hook ./azure_certbot_cleanup.sh
printStatus "PFX Filename:" $PFX
printStatus "Converting to PFX with openssl"
setExternalOutput
sudo openssl pkcs12 -export -out ./$PFX -inkey /etc/letsencrypt/live/$DOMAIN/privkey.pem -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -password pass:$CERT_PW
if [ ! -f ./$PFX ]; then
    printError "PFX File not found! Exiting" >&2
    exit 1
fi
sudo chown $(whoami):staff ./$PFX 
printStatus "Uploading SSL"
setExternalOutput
AZ_RESULT=$(az webapp config ssl upload --certificate-file ./$PFX --name $APP_SERVICE --resource-group $RESOURCE_GROUP --certificate-password $CERT_PW --output tsv --query thumbprint)
printStatus "Thumbprint is $AZ_RESULT"
printStatus "Binding SSL"
setExternalOutput
az webapp config ssl bind --certificate-thumbprint $AZ_RESULT --ssl-type SNI --name $APP_SERVICE --resource-group my-resource-group
printStatus "Complete"
resetColor

```

References
[1][https://kb.objectrocket.com/redis/run-redis-with-docker-compose-1055]
[2][https://azure.github.io/AppService/2018/06/27/How-to-use-Azure-Container-Registry-for-a-Multi-container-Web-App.html]
[3][https://medium.com/@michiels/a-weekend-a-rails-app-a-kubernetes-and-an-azure-d330b003d7c2]
[4][https://azure.github.io/AppService/2020/06/29/zero_to_hero_pt1.html]
