import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/registration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) { }

    @Post()
    register(@Body() createRegistrationDto: CreateRegistrationDto, @Request() req) {
        return this.registrationsService.register(createRegistrationDto, req.user.id);
    }

    @Get('my-registrations')
    findMyRegistrations(@Request() req) {
        return this.registrationsService.findByUser(req.user.id);
    }

    @Get('event/:eventId')
    findByEvent(@Param('eventId') eventId: string) {
        return this.registrationsService.findByEvent(eventId);
    }

    @Patch(':id/cancel')
    cancelRegistration(@Param('id') id: string, @Request() req) {
        return this.registrationsService.cancelRegistration(id, req.user.id);
    }
}
