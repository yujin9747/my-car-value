import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../services/users.iservice';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UserService,
      useClass: UsersService,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
