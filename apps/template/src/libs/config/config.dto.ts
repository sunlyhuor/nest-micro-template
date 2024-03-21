import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ConfigDto {

  @IsNotEmpty()
  DB_TEMPLATE_URI!:string

  @IsNotEmpty()
  DB_TEMPLATE_NAME!:string

  @IsNotEmpty()
  MAIL_HOST!:string

  @IsNumberString()
  @IsNotEmpty()
  MAIL_PORT!:number
  
  @IsNotEmpty()
  MAIL_USER!:string

  @IsNotEmpty()
  MAIL_PASS!:string

  @IsNotEmpty()
  MAIL_DEFAULT!:string

  @IsNotEmpty()
  API_URL!:string

  @IsNotEmpty()
  CLIENT_URL!:string

  @IsNotEmpty()
  ADMIN_URL!:string

  @IsNotEmpty()
  RABBITMQ_URL!:string[]

  @IsNotEmpty()
  RABBITMQ_TEMPLATE_QUEUE!:string

  @IsNotEmpty()
  RABBITMQ_TEMPLATE_NAME!:string

}
