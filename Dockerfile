FROM cypress/included:4.1.0

WORKDIR /app

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json

CMD ["node_modules/.bin/cypress run --browser chrome ", "start"]