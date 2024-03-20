import { IPayload } from "@common/guard/dto/auth.model.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, isNumber } from "class-validator";
import { Types } from "mongoose";

export class PlanInputCreate implements IPayload{
    _id?: Types.ObjectId
    
    userId?: Types.ObjectId

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message:"Title is required"
    })
    title !:string

    @ApiProperty({
        required: false
    })
    @IsOptional({
    })
    description ?:string

    @ApiProperty({
        required: false
    })
    @IsOptional({
    })
    isDisable ?:boolean

    @ApiProperty({
        required: false
    })
    @IsOptional({
    })
    isFree ?:boolean

    @ApiProperty({
        required: true
    })
    @IsNumber()
    price!:number

    @ApiProperty({
        required: true
    })
    @IsNumber()
    originalPrice!:number

    @ApiProperty({
        required: true
    })
    @IsNumber()
    duration!:number

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;

}

export class PlanInputUpdate implements IPayload{
    _id?: Types.ObjectId
    
    userId?: Types.ObjectId

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message:"Title is required"
    })
    title !:string

    @ApiProperty({
        required: false
    })
    @IsOptional({
    })
    description ?:string

    @ApiProperty({
        required: false
    })
    @IsOptional({
    })
    isDisable ?:boolean

    @ApiProperty({
        required: false
    })
    @IsOptional({
    })
    isFree ?:boolean

    @ApiProperty({
        required: true
    })
    @IsNumber()
    price!:number

    @ApiProperty({
        required: true
    })
    @IsNumber()
    originalPrice!:number

    @ApiProperty({
        required: true
    })
    @IsNumber()
    duration!:number

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;

}

export class PlanInputDelete implements IPayload{
    @IsNotEmpty()
    _id?: Types.ObjectId
    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; }; 
    user?: any;
}