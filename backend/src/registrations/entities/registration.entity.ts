import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

export enum RegistrationStatus {
    REGISTERED = 'registered',
    WAITLISTED = 'waitlisted',
    CANCELLED = 'cancelled',
    ATTENDED = 'attended',
}

@Entity('registrations')
@Unique(['userId', 'eventId'])
export class Registration {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.registrations)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: string;

    @ManyToOne(() => Event, (event) => event.registrations)
    @JoinColumn({ name: 'eventId' })
    event: Event;

    @Column()
    eventId: string;

    @Column({
        type: 'enum',
        enum: RegistrationStatus,
        default: RegistrationStatus.REGISTERED,
    })
    status: RegistrationStatus;

    @CreateDateColumn()
    registeredAt: Date;
}
