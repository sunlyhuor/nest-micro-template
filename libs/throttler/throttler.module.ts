import { Global, Logger, Module } from '@nestjs/common';
import { ThrottlerService } from './throttler.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule as _ThrottlerModule } from "@nestjs/throttler"
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    _ThrottlerModule.forRootAsync({
      imports: [ ConfigModule ],
      inject:[ConfigService],
      useFactory: async ( config:ConfigService ) => {
        // let errors:Array<string> = []
        // const logger = new Logger( ThrottlerModule.name )
        // if( !Number( config.get<number>(envEnum.THROTTLER_TTL) ) ){
        //     errors.push( envEnum.THROTTLER_TTL + " required and only number" )
        // }

        // if( !Number( config.get<number>(envEnum.THROTTLER_LIMIT) ) ){
        //     errors.push( envEnum.THROTTLER_LIMIT + " required and only number" )
        // }

        // if( errors.length > 0 ){
        //   errors.forEach(e => logger.error( e ) )
        //   throw new Error()
        // }

        // console.log(Number( config.get<number>(envEnum.THROTTLER_TTL) ) * 60 * 60 )

        return [
          {
            ttl: 5 * 60 * 60,
            limit: 100
          }
        ]
      }
    })
  ],
  providers: [
    ThrottlerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  exports: [
    ThrottlerModule,
    ThrottlerService
  ]
})
export class ThrottlerModule {}
