import { IsString, IsOptional, IsEnum } from 'class-validator';
import { RegistrationStatus } from '../entities/registration.entity';

export class CreateRegistrationDto {
    @IsString()
    eventId: string;
}

export class UpdateRegistrationStatusDto {
    @IsEnum(RegistrationStatus)
    status: RegistrationStatus;
}
