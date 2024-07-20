import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  // let microserviceOptions: MicroserviceOptions;

  // microserviceOptions = {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@localhost:5672'],
  //     queue: 'my_queue',
  //     noAck: false,
  //     prefetchCount: 1,
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // };

  // const microserviceApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions);
  // await microserviceApp.listen();
}

bootstrap();
