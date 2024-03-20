import { Global, Logger, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as _CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envEnum } from '@common/enum/env.enum';

@Global()
@Module({
  imports: [
    _CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config:ConfigService) => {
        const logger = new Logger(CacheModule.name)
        if( !config.get<number>( envEnum.CACHE_TTL) || !Number(config.get<number>( envEnum.CACHE_TTL )) ){
          logger.error( envEnum.CACHE_TTL + " required and only number" )
          throw new Error()
        }

        if( !config.get<number>( envEnum.CACHE_MAX) || !Number(config.get<number>( envEnum.CACHE_MAX )) ){
          logger.error( envEnum.CACHE_MAX + " required and only number" )
          throw new Error()
        }

        return {
          isGlobal: true,
          ttl: Number(config.get<number>( envEnum.CACHE_TTL)),
          max: Number(config.get<number>( envEnum.CACHE_MAX))
        }
      }
    })
  ],
  providers: [
    CacheService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
  exports:[
    CacheModule,
    CacheService
  ]
})
export class CacheModule {}
