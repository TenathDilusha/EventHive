import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Registration } from '../../registrations/entities/registration.entity';

export enum UserRole {
    STUDENT = 'student',
    ORGANIZER = 'organizer',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    role: UserRole;

    @Column({ nullable: true })
    department: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Event, (event) => event.organizer)
    events: Event[];

    @OneToMany(() => Registration, (registration) => registration.user)
    registrations: Registration[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
