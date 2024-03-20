import { IPayload } from "@service/common/guard/dto/auth.model.dto"
import { ExecutionContext, UnauthorizedException, createParamDecorator } from "@nestjs/common"

export const IS_AUTH_KEY = "IS_AUTH_KEY"
export const Auth = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request:IPayload = ctx.switchToRpc().getData()
    return request.user
})