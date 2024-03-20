import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export class BaseSchema{
    @Prop( { default: Date } )
    createdAt: Date

    @Prop( { default: Date } )
    updatedAt: Date

    @Prop( { } )
    updatedBy?: Types.ObjectId

    @Prop( { } )
    createdBy?: Types.ObjectId


}