import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly admin: AdminService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('auth/login')
  login(@Body() dto: AdminLoginDto) {
    return this.admin.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  async listMessages() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
