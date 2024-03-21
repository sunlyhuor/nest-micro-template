import { IS_ROLES_KEY } from '@api/src/common/decorator/roles.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { XAuth } from '@common/guard/dto/auth.model.dto';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private reflector:Reflector
  ){}
  
  canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const requiredRoles = this.reflector.get<Array<RoleEnum>>( IS_ROLES_KEY, context.getHandler() )
      if(!requiredRoles){
        return true
      }

      const request = context.switchToHttp().getRequest()
      const userRole = request["user"] as XAuth
      return requiredRoles.some( rr => userRole?.roles.includes(rr) )
  }
}