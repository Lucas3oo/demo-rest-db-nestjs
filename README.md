# demo-rest-db-nestjs
Small demo project for a REST API with DB, written in TypeScript using the [NestJS](https://github.com/nestjs/nest) framework (based on ExpressJS). NestJS is very similar to Spring boot.

Second part of the demo is to deploy it as an AWS Lambda using the https://www.serverless.com framework.

## Installation

```bash
brew install nodenv
# add eval "$(nodenv init -)" to ~/.zprofile
source ~/.zprofile
nodenv install # install node/npm and add shims for the commands
npm install
```

Install Serverless Framework CLI (outside any nodenv enabled folder)

    npm install -g serverless

    serverless plugin install -n serverless-plugin-optimize
    serverless plugin install -n serverless-offline
    serverless plugin install -n serverless-dynamodb-local


~/.nodenv/versions/18.16.0/lib/node_modules/serverless/bin/serverless.js

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

Test it with cURL:

    curl -v "http://localhost:3000/api/v1/books"
    curl -v "http://localhost:3000/api/v1/books?title=The"

## DB

    docker run --name=mysql-demo --restart on-failure --detach  -e MYSQL_ROOT_PASSWORD=my-password -e MYSQL_DATABASE=app-db  -e MYSQL_USER=app-db-user -e MYSQL_PASSWORD=my-password --publish 3306:3306 mysql:8.0
    docker start mysql-demo


## Deploy as AWS Lambda

The serverless.yaml is some sort of deployment script that follows https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml

The framework will create a Cloudformation stack for it.

    npm run build
    serverless deploy

Test it:

    curl -v "https://apqp8uo4zl.execute-api.eu-north-1.amazonaws.com/dev/api/v1/books  # 'dev' is the stage name defined in serverless.yaml

To just package the zip:

    serverless package # result is under .serverless


Remove lambda, cloudformation and s3 bucket

    serverless remove

### Test the lambda locally

    serverless offline start --noTimeout # always get timeout unless adding this option

Then test it:

    curl -v "http://localhost:3000/dev/api/v1/books"


Console log:

```bash
Running "serverless" from node_modules
Skipping start: DynamoDB Local is not available for stage: dev

Starting Offline at stage dev (eu-north-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * api: books-api-dev-api

   ┌───────────────────────────────────────────────────────────────────────┐
   │                                                                       │
   │   ANY | http://localhost:3000/dev/{proxy*}                            │
   │   POST | http://localhost:3000/2015-03-31/functions/api/invocations   │
   │                                                                       │
   └───────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀


ANY /dev/api/v1/books (λ: api)
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [NestFactory] Starting Nest application...
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +51ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +55ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [InstanceLoader] BookModule dependencies initialized +1ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [RoutesResolver] BookController {/api/v1/books}: +7ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [RouterExplorer] Mapped {/api/v1/books, GET} route +1ms
[Nest] 50402  - 05/18/2023, 6:20:45 PM     LOG [NestApplication] Nest application successfully started +1ms
(λ: api) RequestId: 6340ef85-f401-40c5-8c8f-20c35452ad03  Duration: 1130.41 ms  Billed Duration: 1131 ms
```


## Ref

https://www.serverless.com

https://blog.logrocket.com/nest-js-serverless-application-aws-dynamodb/#what-serverless-framework

https://www.npmjs.com/package/serverless

https://typescript.helpful.codes/tutorials/nestjs/Building-a-serverless-API-with-NestJS-and-AWS-Lambda/

https://dev.to/aws-builders/deploy-a-nestjs-api-to-aws-lambda-with-serverless-framework-4poo
