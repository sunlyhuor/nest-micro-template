import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name)

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // asd(){
    //     this.logger.error("asdhsjd")
    // }
}
