import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users.service";
import { HashPasswordService } from "../hash-password/hash-password.service";

it('can create an instance of auth service', async () => {
  const fakeUserService = {
    // find: () => Promise.resolve([]),
    // create: (email: string, password: string) =>
    //   Promise.resolve({ id: 1, email, password }),
  };

  const fakeHashPasswordService = {
    // hashPassword: () => Promise.resolve('salt.hash'),
    // hashPasswordWithSalt: () => Promise.resolve('salt.hash'),
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

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
