import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { HashPasswordService } from '../hash-password/hash-password.service';
import { User } from '../../entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeUserService: Partial<UsersService> = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const fakeHashPasswordService: Partial<HashPasswordService> = {
      hashPassword: () => Promise.resolve('salt.hash'),
      createHashWithSalt: () => Promise.resolve('salt.hash'),
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
});
