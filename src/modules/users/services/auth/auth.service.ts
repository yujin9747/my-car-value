import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../../entities/user.entity';
import { HashPasswordService } from '../hash-password/hash-password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashPasswordService: HashPasswordService,
  ) {}

  async signup(email: string, password: string): Promise<User> {
    await this.validateDuplicateUserNotExist(email);

    const hashedPasswordWithSalt =
      await this.hashPasswordService.hashPassword(password);

    return await this.usersService.create(email, hashedPasswordWithSalt);
  }

  async validateDuplicateUserNotExist(email: string) {
    const usersByEmail = await this.usersService.find(email);
    if (usersByEmail.length) {
      throw new BadRequestException('email in use');
    }
  }

  async signin(email: string, password: string) {
    const user = await this.validateUserByEmailExist(email);
    const [salt, storedHash] = user.password.split('.');
    await this.validatePasswordMatched(salt, storedHash, password);

    return user;
  }

  async validateUserByEmailExist(email: string): Promise<User> {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found by email');
    }
    return user;
  }

  async validatePasswordMatched(
    salt: string,
    storedHash: string,
    password: string,
  ) {
    const hash = await this.hashPasswordService.createHashWithSalt(
      password,
      salt,
    );

    if (hash != storedHash) {
      throw new BadRequestException('password not matched');
    }
  }
}
