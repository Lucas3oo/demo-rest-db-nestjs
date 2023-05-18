import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import {
  APIGatewayEvent,
  APIGatewayProxyCallback,
  Context,
  Handler,
} from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';

let cachedHandler: Handler;

async function createHandler(): Promise<Handler> {
  if (!cachedHandler) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    nestApp.enableCors();
    await nestApp.init();
    // create the handler as a wrapper around the NestJS/Express app
    cachedHandler = serverlessExpress({ app: expressApp });
  }

  return cachedHandler;
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: APIGatewayProxyCallback,
) => {
  const theHandler = await createHandler();
  return theHandler(event, context, callback);
};
