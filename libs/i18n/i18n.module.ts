import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule as _I18nModule, QueryResolver, AcceptLanguageResolver, HeaderResolver } from 'nestjs-i18n';
import * as path from 'path';

@Global()
@Module({
    imports:[
        _I18nModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => ({
                fallbackLanguage: "en",
                loaderOptions: {
                    path: path.join("locales/"),
                    watch: true
                }
            }),
            resolvers: [
                {
                    use: QueryResolver,
                    options: ["lang"]
                },
                AcceptLanguageResolver,
                new HeaderResolver(["x-lang"])
            ]
        })
    ],
    controllers:[],
    providers:[],
    exports: [
        I18nModule
    ]
})
export class I18nModule {

}
