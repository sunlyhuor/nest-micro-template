import { envEnum } from "@common/enum/env.enum";
import { Global, Logger, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule as _MongooseModule } from "@nestjs/mongoose";
// import * as schemas from "@common/schemas"

@Global()
@Module({
    imports:[
        _MongooseModule.forRootAsync({
            imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: async (env:ConfigService) => {
                return {
                    uri: env.get<string>(envEnum.DB_TEMPLATE_URI),   
                    dbName: env.get<string>(envEnum.DB_TEMPLATE_NAME),
                }
            }
        }),
        // _MongooseModule.forFeature([
        //     ...Object.keys(schemas)
        //         .filter(v => !v.toLocaleLowerCase().includes("schema"))
        //         .map(sc => ({
        //             name: schemas[sc].name,
        //             schema: schemas[`${sc}Schema`]
        //         }) )
        //         .filter(v => v.schema) as {name: string, schema:any}[]
        // ])
    ],
    controllers:[],
    providers:[],
    exports: [
        _MongooseModule
    ]
})
export class MongooseModule{
    onModuleInit(){
    }
}