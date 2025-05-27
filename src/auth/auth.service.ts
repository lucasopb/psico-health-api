import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { PsychologistsService } from 'src/psychologists/psychologists.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private psychologistsService: PsychologistsService,
    private jwtService: JwtService,
  ) { }

  async loginUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async loginPsychologist(email: string, password: string): Promise<any> {
    const psychologist = await this.psychologistsService.findByEmail(email);

    if (!psychologist) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await argon2.verify(psychologist.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: psychologist.id, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}