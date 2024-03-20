import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthorizeGuard } from '@service/common/guard/authorize.guard';
import { JwtModule } from '@lib/jwt/jwt.module';
import { AuthenticateGuard } from '@service/common/guard/authenticate.guard';
import { MongooseModule } from '@template/src/libs/mongoose/mongoose.module';
import { _EventModule } from '@template/src/event/event.module';
import { ConfigModule } from '@lib/config/config.module';

@Module({
  imports: [
    _ConfigModule.forRoot({
      envFilePath: join(".env"),
      isGlobal: true
    }),
    MongooseModule,
    JwtModule,
    // I18nModule,
    // MailerModule,
    // ThrottlerModule,
    ConfigModule,
    // WebsocketModule,
    // FirebaseModule
    _EventModule
  ],
  controllers: [],
  providers: [
    AuthorizeGuard,
    AuthenticateGuard
  ],
})
export class AppModule {}
