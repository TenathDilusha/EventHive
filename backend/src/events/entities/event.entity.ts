import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Registration } from '../../registrations/entities/registration.entity';

export enum EventStatus {
    DRAFT = 'draft',
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

export enum EventCategory {
    ACADEMIC = 'academic',
    CULTURAL = 'cultural',
    SPORTS = 'sports',
    TECHNICAL = 'technical',
    WORKSHOP = 'workshop',
    SEMINAR = 'seminar',
    SOCIAL = 'social',
    OTHER = 'other',
}

@Entity('events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: 'enum',
        enum: EventCategory,
        default: EventCategory.OTHER,
    })
    category: EventCategory;

    @Column()
    venue: string;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    endDate: Date;

    @Column({ default: 100 })
    maxParticipants: number;

    @Column({ default: 0 })
    currentParticipants: number;

    @Column({
        type: 'enum',
        enum: EventStatus,
        default: EventStatus.PENDING,
    })
    status: EventStatus;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    contactEmail: string;

    @Column({ default: false })
    isFeatured: boolean;

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn({ name: 'organizerId' })
    organizer: User;

    @Column()
    organizerId: string;

    @OneToMany(() => Registration, (registration) => registration.event)
    registrations: Registration[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
