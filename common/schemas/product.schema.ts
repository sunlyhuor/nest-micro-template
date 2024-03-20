import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Product{
    @Prop()
    name!:string

    @Prop()
    age!:number

}

export type ProductDocument = HydratedDocument<Product>
export const ProductSchema = SchemaFactory.createForClass(Product)