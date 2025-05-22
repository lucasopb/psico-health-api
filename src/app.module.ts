import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserService } from './users/user.service';
import { PsychologistModule } from './psychologists/psychologists.module';

@Module({
  imports: [AuthModule, PsychologistModule],
  controllers: [],
  providers: [UserService],
})
export class AppModule { }
