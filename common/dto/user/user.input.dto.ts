import { RoleEnum } from "@common/enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";
import { IPayload, XAuth } from '@common/guard/dto/auth.model.dto';

export class UserInputRegister implements IPayload{

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Username is required"
    })
    userName !: string

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    email !: string

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Firstname is required"
    })
    firstName !: string

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty({
        message: "Lastname is required"
    })
    lastName !: string

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Password is required"
    })
    @Length(8)
    password !: string

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    phoneNumber ?: string

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    dateOfBirth ?: Date

    @ApiProperty({
        required: false
    })
    @IsOptional()
    profile ?: string

    roles !: RoleEnum[]

    refreshToken ?: string

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;

}

export class UserInputLogin implements IPayload {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Email or username are required"
    })
    identifier !:string

    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Password is required"
    })
    password !:string

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;
}

export class UserInputUpdate implements IPayload {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty({
        message: "Firstname is required"
    })
    firstName !: string

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty({
        message: "Lastname is required"
    })
    lastName !: string

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    phoneNumber ?: string

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    dateOfBirth ?: Date

    public headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; } = null;
    
    public auth:XAuth|any
    public user:any

    public setHeader(state:{ authorization: string, Authorization?: string, "x-lang"?: string; }):void{
        this.headers.Authorization = state.Authorization
        this.headers.authorization = state.authorization
        this.headers["x-lang"] = state["x-lang"]
    }

}

export class UserInputVerify implements IPayload{
    @ApiProperty({
        required: true
    })
    @IsEmail()
    email !:string

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;
}

export class UserInputResetPassword implements IPayload{
    @ApiProperty({
        required: true
    })
    @IsEmail()
    email !:string

    auth?: any;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;
}

export class UserInputResetNewPassword implements IPayload{
    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @Length(8)
    password!:string

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    @Length(8)
    confirmPassword!:string

    auth?: XAuth;
    headers?: { authorization?: string; Authorization?: string; "x-lang"?: string; };
    user?: any;
}