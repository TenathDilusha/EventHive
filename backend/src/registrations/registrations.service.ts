import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration, RegistrationStatus } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/registration.dto';
import { EventsService } from '../events/events.service';
import { EventStatus } from '../events/entities/event.entity';

@Injectable()
export class RegistrationsService {
    constructor(
        @InjectRepository(Registration)
        private registrationsRepository: Repository<Registration>,
        private eventsService: EventsService,
    ) { }

    async register(createRegistrationDto: CreateRegistrationDto, userId: string): Promise<Registration> {
        const event = await this.eventsService.findOne(createRegistrationDto.eventId);

        if (event.status !== EventStatus.APPROVED) {
            throw new BadRequestException('Event is not open for registration');
        }

        const existingRegistration = await this.registrationsRepository.findOne({
            where: { userId, eventId: createRegistrationDto.eventId },
        });

        if (existingRegistration) {
            throw new ConflictException('You are already registered for this event');
        }

        let status = RegistrationStatus.REGISTERED;
        if (event.currentParticipants >= event.maxParticipants) {
            status = RegistrationStatus.WAITLISTED;
        }

        const registration = this.registrationsRepository.create({
            userId,
            eventId: createRegistrationDto.eventId,
            status,
        });

        const saved = await this.registrationsRepository.save(registration);

        if (status === RegistrationStatus.REGISTERED) {
            event.currentParticipants += 1;
            await this.eventsService.updateStatus(event.id, { status: event.status });
        }

        return saved;
    }

    async findByUser(userId: string): Promise<Registration[]> {
        return this.registrationsRepository.find({
            where: { userId },
            relations: ['event'],
            order: { registeredAt: 'DESC' },
        });
    }

    async findByEvent(eventId: string): Promise<Registration[]> {
        return this.registrationsRepository.find({
            where: { eventId },
            relations: ['user'],
            order: { registeredAt: 'ASC' },
        });
    }

    async cancelRegistration(id: string, userId: string): Promise<Registration> {
        const registration = await this.registrationsRepository.findOne({
            where: { id, userId },
        });

        if (!registration) {
            throw new NotFoundException('Registration not found');
        }

        registration.status = RegistrationStatus.CANCELLED;
        return this.registrationsRepository.save(registration);
    }

    async countAll(): Promise<number> {
        return this.registrationsRepository.count({
            where: { status: RegistrationStatus.REGISTERED },
        });
    }

    async getRegistrationsByEventId(eventId: string): Promise<number> {
        return this.registrationsRepository.count({
            where: { eventId, status: RegistrationStatus.REGISTERED },
        });
    }
}
