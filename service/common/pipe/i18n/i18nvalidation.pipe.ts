// import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
// import { validate } from 'class-validator';
// import { plainToClass } from 'class-transformer';
// import { I18nService } from 'nestjs-i18n';
// import { RpcException } from '@nestjs/microservices';

// @Injectable()
// export class I18nValidationPipe implements PipeTransform<any> {
//   constructor(private readonly i18nService: I18nService) {}

//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (!metatype || !this.isClass(metatype)) {
//       return value;
//     }

//     const object = plainToClass(metatype, value);
//     const errors = await validate(object);

//     if (errors.length > 0) {
//       const messages = await Promise.all(
//         errors.map(async (err) => {
//           const property = err.property;
//           const constraints = err.constraints;

//           const constraintKey = Object.keys(constraints)[0];
//           const constraintMessage = await this.i18nService.translate(
//             `TEST`,
//             { },
//           );

//           return `${property} ${constraintMessage}`;
//         }),
//       );

//       throw new RpcException(messages);
//     }

//     return value;
//   }

//   private isClass(arg: any): boolean {
//     return typeof arg === 'function' && arg !== undefined;
//   }
// }
