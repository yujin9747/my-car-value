import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { HashPasswordService } from '../hash-password/hash-password.service';
import { User } from '../../entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  let fakeHashPasswordService: Partial<HashPasswordService>;

  beforeEach(async () => {
    fakeUserService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    fakeHashPasswordService = {
      hashPassword: () => Promise.resolve('salt.hash'),
      createHashWithSalt: () => Promise.resolve('hash'),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: HashPasswordService,
          useValue: fakeHashPasswordService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with non-duplicated email', async () => {
    const user = await service.signup('test@email.com', 'password');

    expect(user).toBeDefined();
    expect(user.password).not.toEqual('password');
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@email.com', password: 'salt.hash' } as User,
      ]);

    await expect(service.signup('test@email.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.validateUserByEmailExist('test@email.com'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    await expect(
      service.validatePasswordMatched('salt', 'storedHash', 'password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('signin with exist email and valid password', async () => {
    fakeUserService.find = () =>
      Promise.resolve([
        { id: 1, email: 'test@email.com', password: 'salt.hash' } as User,
      ]);
    fakeHashPasswordService.createHashWithSalt = () => Promise.resolve('hash');

    expect(service.signin('test@email.com', 'password')).toBeDefined();
  });
});
