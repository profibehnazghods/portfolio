import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'dev_secret',
        signOptions: {
          // 2h = 7200 seconds
          expiresIn: Number(config.get<string>('JWT_EXPIRES_IN_SECONDS') ?? 7200),
        },
      }),
    }),    
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
})
export class AdminModule {}
