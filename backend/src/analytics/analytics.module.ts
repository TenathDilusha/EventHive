import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';
import { RegistrationsModule } from '../registrations/registrations.module';

@Module({
    imports: [EventsModule, UsersModule, RegistrationsModule],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
