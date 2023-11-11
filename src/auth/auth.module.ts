import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './services';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [],
})
export class AuthModule {}
