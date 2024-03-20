import { envEnum } from '@common/enum/env.enum';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as _JwtService } from '@nestjs/jwt';
// import {JwtService as _JwtService  } from "@nestjs/jwt"

@Injectable()
export class JwtService {
    private readonly logger = new Logger(JwtService.name)
    // private readonly jwtService:_JwtService = new _JwtService()

    constructor(
        private readonly configService:ConfigService,
        private readonly jwtService:_JwtService
    ){
    }

    /**
     * 
     * @param payload 
     * @param opt
     * @returns 
     */
    async sign<T extends object>( payload:T, opt:{
        secret?:envEnum,
        exp?:string|number
    } ){
        return this.jwtService.sign(
            payload,
            {
                secret: opt?.secret ? this.configService.get<string>( opt?.secret ) : this.configService.get<string>( envEnum.ACCESS_TOKEN_SECRET ),
                // expiresIn: opt.exp ? //Check alviable
                //     typeof opt.exp  == "string" ? opt.exp :
                //     Number(opt.exp) * 60 : //Check string or number
                //     this.configService.get<string>(envEnum.ACCESS_TOKEN_EXPIRE) //Default
                expiresIn: opt.exp ? opt.exp : this.configService.get( envEnum.ACCESS_TOKEN_EXPIRE )
            }
        )
    }

    /**
     * 
     * @param token 
     * @param secret key
     * @returns 
     */
    async verify( token:string, secret?:envEnum ){
        try{
            const auth = await this.jwtService.verify( token, {
                secret: secret ? this.configService.get<string>(secret) : this.configService.get<string>(envEnum.ACCESS_TOKEN_SECRET)
            } )
            if(auth){
                return auth
            }return false
        }catch(e){
            return false
        }
    }

    signJwt(params:any, expiredIn: number | string, secret:envEnum): string {
        return this.jwtService.sign(params, { expiresIn: typeof expiredIn == 'number' ? expiredIn * 60 : expiredIn, secret: secret });
      }

}
