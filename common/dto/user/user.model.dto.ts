import { RoleEnum } from "@common/enum/role.enum"
import { Types } from "mongoose"

export class UserModel{
    _id ?: Types.ObjectId
    userId !: Types.ObjectId

    description: string

    name !:string

    logo?: string

    cover?: string

    lat !:string

    lng !: string

    isDelete ?: boolean

    contact?: {
        social?:{
            facebook ?:string,
            tiktok ?:string,
            youtube ?:string,
            x ?:string,
            telegram ?:string
        },
        phone ?:string,
    }

    updatedAt?: Date
    createdAt?: Date

    accessToken?: string
    refreshToken?: string
    password?:string
    profile?:string
    firstName?:string
    lastName?:string
    roles?:RoleEnum[]

}