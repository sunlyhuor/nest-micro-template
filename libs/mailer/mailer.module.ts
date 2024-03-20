import { Logger, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as _MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envEnum } from '@common/enum/env.enum';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    _MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => {
        const logger = new Logger( MailerModule.name )
        let errors:Array<string> = []

        if( !config.get<string>( envEnum.MAIL_HOST ) ){
            errors.push( envEnum.MAIL_HOST + " required"  )
        }

        if( !config.get<number>( envEnum.MAIL_PORT ) || !Number(config.get<number>(envEnum.MAIL_PORT)) ){
            errors.push( envEnum.MAIL_PORT + " required and only number" )
        }

        if( !config.get<string>( envEnum.MAIL_USER ) ){
            errors.push( envEnum.MAIL_USER + " required" )
        }

        if( !config.get<string>( envEnum.MAIL_PASS ) ){
            errors.push( envEnum.MAIL_PASS + " required" )
        }

        if( !config.get<string>( envEnum.MAIL_DEFAULT ) ){
            errors.push( envEnum.MAIL_DEFAULT + " required" )
        }

        if( errors.length > 0 ){
            errors.forEach( e => logger.error( e ) )
            throw new Error()
        }


        return {
            transport: {
              host: config.get<string>( envEnum.MAIL_HOST ),
              port: config.get<number>(envEnum.MAIL_PORT),
              auth:{
                user: config.get<string>(envEnum.MAIL_USER),
                pass: config.get<string>(envEnum.MAIL_PASS)
              }
            },
            defaults: {
              from: config.get<string>(envEnum.MAIL_DEFAULT)
            },
            template: {
                dir: join("common", "templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true
                }
            }
        }
      }
    })
  ],
  providers: [MailerService],
  exports: [
    MailerModule,
    MailerService
  ]
})
export class MailerModule {}
