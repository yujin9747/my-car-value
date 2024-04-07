import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'password',
          } as User,
        ]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@email.com',
          password: 'password',
        } as User);
      },
    };
    const fakeAuthService: Partial<AuthService> = {
      signup: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('test@email.com');
    expect(users.length).toBeGreaterThan(0);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@email.com');
  });

  it('findUser returns a user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'test@email.com', password: 'password' },
      session,
    );

    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it('signup updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.createUser(
      { email: 'test@email.com', password: 'password' },
      session,
    );

    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
