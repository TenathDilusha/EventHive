import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        const user = await this.usersService.create({
            ...registerDto,
            role: UserRole.STUDENT,
        });

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                department: user.department,
            },
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                department: user.department,
            },
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userId: string) {
        return this.usersService.findOne(userId);
    }
}
