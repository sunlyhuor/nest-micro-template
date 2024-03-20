import { IS_PUBLIC_KEY } from '@service/common/decorator/public.decorator';
import { envEnum } from '@common/enum/env.enum';
import  {JwtService} from '@lib/jwt/jwt.service';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IPayload, XAuth } from './dto/auth.model.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(
    private refactor:Reflector,
    private readonly jwtService:JwtService
  ){}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
      const request:IPayload = context.switchToRpc().getData()

      const isPublic:boolean = this.refactor.get<boolean>(IS_PUBLIC_KEY, context.getHandler() )
      if( isPublic ){
        const authorization = request.headers?.["authorization"] || ""
        if( authorization ){
              const token = authorization?.split("Bearer")[authorization?.split("Bearer").length - 1]
              const auth = await this.jwtService.verify(
                token.trim(),
                envEnum.ACCESS_TOKEN_SECRET
              ) as XAuth 
              request.user = auth
        }
          return true;
      }

      const authorization = request.headers?.["authorization"] || ""
      if( !authorization ){
          throw new RpcException("Not allow request no authoraztion header")
      }

      const token = authorization?.split("Bearer")[authorization?.split("Bearer").length - 1]
      const auth = await this.jwtService.verify(
        token.trim(),
        envEnum.ACCESS_TOKEN_SECRET
      ) as XAuth 

      if( !auth ){
        throw new RpcException("Invalid token")  
      }

      request.user = auth as XAuth
      return true;
  
  }

}
