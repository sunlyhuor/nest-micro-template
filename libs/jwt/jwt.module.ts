import { Global, Module } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { JwtModule as _JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
    imports:[
        _JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async ( configService:ConfigService ) => ({
                secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
                global: true,
                signOptions:{
                }
            })
        })
    ],
    controllers: [
    ],
    providers: [
        JwtService
    ],
    exports:[
        JwtService
    ]
})
export class JwtModule{
    
}