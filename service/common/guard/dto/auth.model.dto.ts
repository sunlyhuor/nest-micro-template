import { RoleEnum } from "@common/enum/role.enum";
import { Types } from "mongoose";

export interface XAuth{
    _id: Types.ObjectId,
    roles:Array<RoleEnum>,
    origin?:string,
}

export type IPayload = {
    headers?:{
        authorization?: string,
        Authorization?: string,
        "x-lang"?:string
    },
    auth?:any,
    user?:any
}