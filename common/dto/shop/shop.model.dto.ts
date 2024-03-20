import { Types } from "mongoose"

export class ShopModel{
    userId !: Types.ObjectId

    description: string

    name !:string

    logo?: string

    cover?: string

    lat !:string

    lng !: string

    isDelete ?: boolean
}