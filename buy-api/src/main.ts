import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'buy-api',
        brokers: ['localhost:9094'],
      },
      consumer: {
        groupId: 'buy-consumer'
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
