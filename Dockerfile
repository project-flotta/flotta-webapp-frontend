FROM node:16.15.0-alpine

WORKDIR /app

COPY . /app

RUN npm install -g @vue/cli

RUN npm install

EXPOSE 8080

CMD npm run serve