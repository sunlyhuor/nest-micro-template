import { IPayload } from '@common/guard/dto/auth.model.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class ShopInputCreate implements IPayload{

    userId ?:Types.ObjectId

    @ApiProperty(
        {required: false}
    )
    @IsOptional()
    description?: string

    @ApiProperty(
        {required: false}
    )
    @IsOptional()
    logo?: string

    @ApiProperty({
        required:true
    })
    @IsNotEmpty({
        message:"Shop is required"
    })
    @Matches( /^[a-zA-Z]/, {
        message: "asdjas"
    } )
    name!:string

    @ApiProperty(
        {required: false}
    )
    @IsOptional()
    cover?: string

    @ApiProperty({
        required:false
    })
    @IsOptional()
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

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Lat is required"
    })
    lat!: string

    @IsNotEmpty({
        message:" Lng is required"
    })
    @ApiProperty({
        required: true
    })
    lng!: string

    @ApiProperty({
        required: false,
        default: false
    })
    isDelete?: boolean

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message:"Branch is required"
    })
    branchName !: string

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;

}