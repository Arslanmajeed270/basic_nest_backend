import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
