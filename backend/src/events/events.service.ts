import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Event, EventStatus } from './entities/event.entity';
import { CreateEventDto, UpdateEventDto, UpdateEventStatusDto } from './dto/event.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) { }

    async create(createEventDto: CreateEventDto, organizerId: string): Promise<Event> {
        const event = this.eventsRepository.create({
            ...createEventDto,
            organizerId,
            status: EventStatus.PENDING,
        });
        return this.eventsRepository.save(event);
    }

    async findAll(status?: EventStatus, category?: string): Promise<Event[]> {
        const queryBuilder = this.eventsRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.organizer', 'organizer')
            .select([
                'event',
                'organizer.id',
                'organizer.firstName',
                'organizer.lastName',
                'organizer.email',
            ]);

        if (status) {
            queryBuilder.andWhere('event.status = :status', { status });
        }

        if (category) {
            queryBuilder.andWhere('event.category = :category', { category });
        }

        queryBuilder.orderBy('event.startDate', 'ASC');
        return queryBuilder.getMany();
    }

    async findApproved(): Promise<Event[]> {
        return this.eventsRepository.find({
            where: {
                status: EventStatus.APPROVED,
                startDate: MoreThanOrEqual(new Date()),
            },
            relations: ['organizer'],
            order: { startDate: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Event> {
        const event = await this.eventsRepository.findOne({
            where: { id },
            relations: ['organizer', 'registrations'],
        });
        if (!event) {
            throw new NotFoundException(`Event #${id} not found`);
        }
        return event;
    }

    async findByOrganizer(organizerId: string): Promise<Event[]> {
        return this.eventsRepository.find({
            where: { organizerId },
            order: { createdAt: 'DESC' },
        });
    }

    async update(id: string, updateEventDto: UpdateEventDto, userId: string, userRole: string): Promise<Event> {
        const event = await this.findOne(id);

        if (userRole !== 'admin' && event.organizerId !== userId) {
            throw new ForbiddenException('You can only edit your own events');
        }

        await this.eventsRepository.update(id, updateEventDto);
        return this.findOne(id);
    }

    async updateStatus(id: string, updateStatusDto: UpdateEventStatusDto): Promise<Event> {
        const event = await this.findOne(id);
        event.status = updateStatusDto.status;
        return this.eventsRepository.save(event);
    }

    async remove(id: string, userId: string, userRole: string): Promise<void> {
        const event = await this.findOne(id);

        if (userRole !== 'admin' && event.organizerId !== userId) {
            throw new ForbiddenException('You can only delete your own events');
        }

        await this.eventsRepository.delete(id);
    }

    async countAll(): Promise<number> {
        return this.eventsRepository.count();
    }

    async countByStatus(status: EventStatus): Promise<number> {
        return this.eventsRepository.count({ where: { status } });
    }

    async getUpcomingCount(): Promise<number> {
        return this.eventsRepository.count({
            where: {
                status: EventStatus.APPROVED,
                startDate: MoreThanOrEqual(new Date()),
            },
        });
    }

    async getFeaturedEvents(): Promise<Event[]> {
        return this.eventsRepository.find({
            where: {
                isFeatured: true,
                status: EventStatus.APPROVED,
            },
            relations: ['organizer'],
            order: { startDate: 'ASC' },
            take: 6,
        });
    }
}
