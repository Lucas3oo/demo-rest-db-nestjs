# demo-rest-db-nestjs
Small demo project for a REST API with DB, written in TypeScript using the NestJS framework (based on ExpressJS). NestJS is very similar to Spring boot.


## Description

[NestJS](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

    curl -v "http://localhost:3000/api/v1/books"
    curl -v "http://localhost:3000/api/v1/books?title=The"

## DB

    docker run --name=mysql-demo --restart on-failure --detach  -e MYSQL_ROOT_PASSWORD=my-password -e MYSQL_DATABASE=app-db  -e MYSQL_USER=app-db-user -e MYSQL_PASSWORD=my-password --publish 3306:3306 mysql:8.0
    docker start mysql-demo

