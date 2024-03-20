import { RoleEnum } from '@common/enum/role.enum';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

export const IS_ROLES_KEY = "IS_ROLES_KEY"
export const Roles = (...arg:RoleEnum[]) => SetMetadata(IS_ROLES_KEY, arg)
