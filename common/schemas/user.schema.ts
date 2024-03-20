import { RoleEnum } from "@common/enum/role.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BaseSchema } from "./base.schema";
import { Expose } from "class-transformer";

@Schema()
export class User extends BaseSchema {

    _id?: Types.ObjectId

    @Prop( { unique: true, required: true } )
    userName!: string

    @Prop( { required: true } )
    firstName!: string

    @Prop( { required: true } )
    lastName!: string

    @Prop( { unique: true, required: true } )
    email !:string

    @Prop( { } )
    profile?: string

    @Prop( {
        required: true
    } )
    roles!: RoleEnum[]

    @Prop( { select: false } )
    password!:string

    @Prop( { select: false } )
    refreshToken?:string

    @Prop()
    dateOfBirth?:Date

    @Expose( )
    @Prop( { default: false } )
    isDelete?: boolean

    @Prop( { default: false } )
    isVerified?: boolean

    accessToken?: string

}

export type UserDocument = HydratedDocument<User>
export const UserSchema = SchemaFactory.createForClass(User)