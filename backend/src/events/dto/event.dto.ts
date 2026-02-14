import { IsString, IsOptional, IsEnum, IsDateString, IsNumber, IsBoolean } from 'class-validator';
import { EventCategory, EventStatus } from '../entities/event.entity';

export class CreateEventDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(EventCategory)
    @IsOptional()
    category?: EventCategory;

    @IsString()
    venue: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsNumber()
    @IsOptional()
    maxParticipants?: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsOptional()
    contactEmail?: string;
}

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(EventCategory)
    @IsOptional()
    category?: EventCategory;

    @IsString()
    @IsOptional()
    venue?: string;

    @IsDateString()
    @IsOptional()
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsNumber()
    @IsOptional()
    maxParticipants?: number;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;
}

export class UpdateEventStatusDto {
    @IsEnum(EventStatus)
    status: EventStatus;
}
