import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthorizeGuard } from '@service/common/guard/authorize.guard';
import { AuthenticateGuard } from '@service/common/guard/authenticate.guard';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@service/common/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options:{
        noAck: true,
        queueOptions: {
          durable: false
        },
        isGlobalPrefetchCount: true,
        queue: process.env.RABBITMQ_AUTH_QUEUE,
        urls: JSON.parse( process.env.RABBITMQ_URL ),
      }
  });

  const configService = app.get(ConfigService)

  // Register I18n

  // Register Validation Pipe
  app.useGlobalPipes( new ValidationPipe() )

  // Resgister authorize and authenticate
  const authorizeGuard = app.select(AppModule).get(AuthorizeGuard)
  const authenticateGuard = app.select(AppModule).get(AuthenticateGuard)
  app.useGlobalGuards( authenticateGuard, authorizeGuard )

  await app.listen();
}
bootstrap();
