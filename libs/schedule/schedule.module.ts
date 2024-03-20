import { Global, Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule as _ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [
      _ScheduleModule.forRoot()
  ],
  providers: [ScheduleService],
  exports:[
    ScheduleModule,
    ScheduleService
  ]
})
export class ScheduleModule {}
