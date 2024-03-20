import { Global, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true
    })
  ],
  providers: [EventService],
  exports: [
    EventService,
    EventModule
  ]
})
export class EventModule {}
