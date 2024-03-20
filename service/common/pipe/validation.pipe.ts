import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {  } from "nestjs-i18n"

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
          return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = (await validate(object, { whitelist: true } ));
        if (errors.length > 0) {
            const filterErrors:Array<string> = errors.map(e =>  (`${e.constraints![Object.keys(e.constraints!)[0]]}`) );
            throw new RpcException( {
                error: filterErrors,
                message: "Bad request"
            } );
        }
        return value;
      }
    
      private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
      }
}