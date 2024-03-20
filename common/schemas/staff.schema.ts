import { StaffRoleEnum } from "@common/enum/role.enum";
import { StaffStatusEnum } from "@common/enum/util.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BaseSchema } from "./base.schema";

@Schema()
export class Staff extends BaseSchema {
   
    @Prop( { unique: true } )
    userName!: string

    @Prop( { } )
    firstName!: string

    @Prop( {  } )
    lastName!: string

    @Prop( { } )
    profile?: string

    @Prop( {} )
    role!: StaffRoleEnum[]

    @Prop()
    password!:string

    @Prop()
    refreshToken?:string

    @Prop()
    dateOfBirth?:Date

    @Prop( { default: false } )
    isDelete?: boolean

    @Prop()
    branchId!: Types.ObjectId

    @Prop()
    salary!: number

    @Prop()
    status: StaffStatusEnum

}

export type StaffDocument = HydratedDocument<Staff>
export const StaffSchema = SchemaFactory.createForClass(Staff)