import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get('DB_USERNAME', 'postgres'),
                password: configService.get('DB_PASSWORD', 'postgres'),
                database: configService.get('DB_NAME', 'eventhive'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, // Disable in production
                logging: false,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        EventsModule,
        RegistrationsModule,
        AnalyticsModule,
    ],
})
export class AppModule { }
