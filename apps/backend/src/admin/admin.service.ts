import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      throw new Error('ADMIN_EMAIL / ADMIN_PASSWORD_HASH is missing in .env');
    }

    const emailOk = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    const passOk = await bcrypt.compare(password, adminPasswordHash);

    if (!emailOk || !passOk) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin', email: adminEmail };
    const accessToken = await this.jwt.signAsync(payload, { expiresIn: '2h' });

    return { accessToken };
  }
}
