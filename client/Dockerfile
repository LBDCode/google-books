FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/

COPY package.json /usr/src/app

RUN npm install

COPY src /usr/src/app/src
COPY public /usr/src/app/public

EXPOSE 3000

CMD [ "npm", "start" ]