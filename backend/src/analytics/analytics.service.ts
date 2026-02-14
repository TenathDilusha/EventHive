import { Injectable } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';
import { RegistrationsService } from '../registrations/registrations.service';
import { EventStatus } from '../events/entities/event.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        private eventsService: EventsService,
        private usersService: UsersService,
        private registrationsService: RegistrationsService,
    ) { }

    async getDashboardStats() {
        const [totalEvents, totalUsers, totalRegistrations, upcomingEvents, pendingApprovals] =
            await Promise.all([
                this.eventsService.countAll(),
                this.usersService.countAll(),
                this.registrationsService.countAll(),
                this.eventsService.getUpcomingCount(),
                this.eventsService.countByStatus(EventStatus.PENDING),
            ]);

        return {
            totalEvents,
            totalUsers,
            totalRegistrations,
            upcomingEvents,
            pendingApprovals,
        };
    }

    async getEventAnalytics(eventId: string) {
        const event = await this.eventsService.findOne(eventId);
        const registrationCount = await this.registrationsService.getRegistrationsByEventId(eventId);

        return {
            event: {
                id: event.id,
                title: event.title,
                venue: event.venue,
                startDate: event.startDate,
                endDate: event.endDate,
            },
            registrationCount,
            maxParticipants: event.maxParticipants,
            fillRate: event.maxParticipants > 0
                ? Math.round((registrationCount / event.maxParticipants) * 100)
                : 0,
        };
    }
}
