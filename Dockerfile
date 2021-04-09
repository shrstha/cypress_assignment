# FROM cypress/included:4.1.0

# WORKDIR /app

# COPY ./cypress ./cypress
# COPY ./cypress.json ./cypress.json

# CMD ["node_modules/.bin/cypress run --browser chrome ", "start"]

FROM cypress/browsers:node12.14.0-chrome79-ff71

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install
RUN npm install cypress

RUN $(npm bin)/cypress run --browser chrome