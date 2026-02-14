import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('dashboard')
    getDashboardStats() {
        return this.analyticsService.getDashboardStats();
    }

    @Get('event/:id')
    getEventAnalytics(@Param('id') id: string) {
        return this.analyticsService.getEventAnalytics(id);
    }
}
