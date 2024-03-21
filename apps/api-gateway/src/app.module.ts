import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApiModule } from '@api/src/api/api.module';
import { AuthorizeGuard } from './common/guard/authorize.guard';
import { JwtModule } from '@lib/jwt/jwt.module';
import { AuthenticateGuard } from '@api/src/common/guard/authenticate.guard';
import { EventModule } from '@lib/event/event.module';
import { I18nModule } from '@lib/i18n/i18n.module';
import { MailerModule } from '@lib/mailer/mailer.module';
import { ThrottlerModule } from '@lib/throttler/throttler.module';
import { WebsocketModule } from '@lib/websocket/websocket.module';
import { MicroserviceModule } from '@lib/microservice/microservice.module';
import { ConfigModule } from '@api/src/libs/config/config.module';
import { FirebaseModule } from '@lib/firebase/firebase.module';

@Module({
  imports: [
    _ConfigModule.forRoot({
      envFilePath: join(".env"),
      isGlobal: true
    }),
    // MongooseModule,
    ApiModule,
    JwtModule,
    EventModule,
    I18nModule,
    MailerModule,
    ThrottlerModule,
    ConfigModule,
    WebsocketModule,
    MicroserviceModule,
    FirebaseModule
  ],
  controllers: [],
  providers: [
    AuthorizeGuard,
    AuthenticateGuard
  ],
})
export class AppModule {}
