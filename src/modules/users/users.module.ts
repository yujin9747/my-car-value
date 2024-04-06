import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { HashPasswordService } from './services/hash-password/hash-password.service';
import { AuthService } from './services/auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    HashPasswordService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
