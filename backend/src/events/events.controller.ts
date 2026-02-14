import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto, UpdateEventStatusDto } from './dto/event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { EventStatus } from './entities/event.entity';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    findAll(@Query('status') status?: EventStatus, @Query('category') category?: string) {
        return this.eventsService.findAll(status, category);
    }

    @Get('approved')
    findApproved() {
        return this.eventsService.findApproved();
    }

    @Get('featured')
    getFeatured() {
        return this.eventsService.getFeaturedEvents();
    }

    @Get('my-events')
    @UseGuards(JwtAuthGuard)
    findMyEvents(@Request() req) {
        return this.eventsService.findByOrganizer(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
    create(@Body() createEventDto: CreateEventDto, @Request() req) {
        return this.eventsService.create(createEventDto, req.user.id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
        @Request() req,
    ) {
        return this.eventsService.update(id, updateEventDto, req.user.id, req.user.role);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdateEventStatusDto,
    ) {
        return this.eventsService.updateStatus(id, updateStatusDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string, @Request() req) {
        return this.eventsService.remove(id, req.user.id, req.user.role);
    }
}
