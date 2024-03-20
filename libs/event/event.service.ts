import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventService {
    private readonly logger = new Logger(EventService.name)
    @OnEvent("test.event")
    testEvent(payload:string){
        this.logger.error(payload)
    }
}
