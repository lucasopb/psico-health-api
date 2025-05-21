import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
