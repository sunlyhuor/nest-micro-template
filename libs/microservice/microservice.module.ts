import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from "dotenv"

dotenv.config()

@Global()
@Module({
    imports:[
        ClientsModule.register(
             [
                {
                    name: process.env.RABBITMQ_AUTH_NAME,
                    transport: Transport.RMQ,
                    options:{
                        urls:[JSON.parse(process.env.RABBITMQ_URL)],
                        noAck: true,
                        queue: process.env.RABBITMQ_AUTH_QUEUE,
                        isGlobalPrefetchCount: true,
                        queueOptions: {
                            durable: false
                        }
                    }
                },
                {
                    name: process.env.RABBITMQ_SHOP_NAME,
                    transport: Transport.RMQ,
                    options:{
                        urls:[JSON.parse(process.env.RABBITMQ_URL)],
                        noAck: true,
                        queue: process.env.RABBITMQ_SHOP_QUEUE,
                        isGlobalPrefetchCount: true,
                        queueOptions: {
                            durable: false
                        }
                    }
                }
            ]
        )
    ],
    exports: [
        ClientsModule
    ]
})
export class MicroserviceModule {
    onModuleInit(){
    }
}
