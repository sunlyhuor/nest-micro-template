import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ConfigDto {
  @IsNotEmpty()
  NODE_ENV!: string;

  @IsNotEmpty()
  ACCESS_TOKEN_SECRET!: string;

  @IsNotEmpty()
  REFRESH_TOKEN_SECRET!: string;

  @IsNotEmpty({message: "ACCESS_TOKEN_EXPIRE value like 1s, 1m, 1h, 1d"})
  ACCESS_TOKEN_EXPIRE!: string;

  @IsNotEmpty({message: "REFRESH_TOKEN_EXPIRE value like 1s, 1m, 1h, 1d"})
  REFRESH_TOKEN_EXPIRE!: string;

  @IsNotEmpty()
  DB_URI!:string

  @IsNotEmpty()
  DB_NAME!:string

  @IsNumberString()
  @IsNotEmpty()
  CACHE_TTL!:number  

  @IsNumberString()
  @IsNotEmpty()
  CACHE_MAX!:number

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
  RABBITMQ_AUTH_QUEUE!:string

  @IsNotEmpty()
  RABBITMQ_AUTH_NAME!:string

}
