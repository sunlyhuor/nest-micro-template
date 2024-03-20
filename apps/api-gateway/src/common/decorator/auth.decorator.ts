import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common"

export const IS_AUTH_KEY = "IS_AUTH_KEY"
export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})