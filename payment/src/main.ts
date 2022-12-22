import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'pay-api',
        brokers: ['localhost:9094'],
      },
      consumer: {
        groupId: 'pay-consumer'
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3300);
}
bootstrap();
