import { IS_ROLES_KEY } from '@service/common/decorator/roles.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGaurd implements CanActivate {
  constructor(
    private reflector:Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles:RoleEnum[] = this.reflector.get<Array<RoleEnum>>(IS_ROLES_KEY, context.getHandler())
    throw new BadRequestException( roles )
    return true;
  }
}
