DOCKER ?= docker
DOCKER_IMAGE ?= flotta-webapp-frontend
DOCKER_TAG ?= latest
DOCKER_CONTAINER ?= flotta-frontend
DOCKER_CONTAINER_NAME ?= flotta-frontend
DOCKER_CONTAINER_PORT ?= 3000
DOCKER_FILE_DEV ?= Dockerfile

# Build the docker image
docker-build:
	$(DOCKER) build -t $(DOCKER_IMAGE):$(DOCKER_TAG) . -f $(DOCKER_FILE_DEV)

# Run the docker image
docker-run:
	$(DOCKER) run -p $(DOCKER_CONTAINER_PORT):8080 -v $(shell pwd):/app -t $(DOCKER_IMAGE):$(DOCKER_TAG)