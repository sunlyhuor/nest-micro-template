import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthorizeGuard } from '@common/api-gateway/guard/authorize.guard';
import { AuthenticateGuard } from '@common/api-gateway/guard/authenticate.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nMiddleware, I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n"
import { ConfigService } from '@nestjs/config';
import { envEnum } from '@common/enum/env.enum';
import helmet from 'helmet';
import * as bodyParser from "body-parser"
import * as cookieParser from 'cookie-parser';
import * as express from "express"
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  // Static
  app.use( "/public", express.static( join("public") ) )

  // Register Origin
  app.enableCors({
    credentials: true,
    allowedHeaders: [
      "authorization",
      "x-lang",
      "content-type",
      "x-device"
    ],
    methods: "*",
    preflightContinue: true,
    origin: ( origin, cb ) => {
      const ori = `${configService.get<string>( envEnum.ORIGIN )}|${configService.get<string>( envEnum.ADMIN_URL )}|${configService.get<string>( envEnum.API_URL )}|${configService.get<string>( envEnum.CLIENT_URL )}`
      if( ori.includes("*") ){
          cb(null, true)
      }else if( ori.toLocaleLowerCase().includes( origin.toLocaleLowerCase() ) ){
        cb(null, true)
      }else{
        cb( null, false )
      }
    } 
    
  })

  // Register Validation Pipe
  // app.useGlobalPipes( new ValidationPipe() )

    // Register I18n Guard
    app.useGlobalPipes( new I18nValidationPipe({
      whitelist: true,
    }) )
    app.use( I18nMiddleware )
    app.useGlobalFilters( new I18nValidationExceptionFilter({
      detailedErrors: false
    }) )

  // Resgister authorize and authenticate
  const authorizeGuard = app.select(AppModule).get(AuthorizeGuard)
  const authenticateGuard = app.select(AppModule).get(AuthenticateGuard)
  app.useGlobalGuards( authenticateGuard, authorizeGuard )

  //Cookie parser
  app.use(cookieParser());

  // Helmet
  app.use( helmet() )

  // Json
  app.use( bodyParser.json() )

  app.setGlobalPrefix("api")

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("POS Template")
    .setDescription("Make build system easy")
    .setVersion("1.0")
    .setExternalDoc("Do with postman", "/postman")
    .addBearerAuth()
    .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

  await app.listen(3000);
}
bootstrap();
