import { Test } from '@nestjs/testing';
import {
  HashPasswordService,
  KEY_LENGTH,
  SIZE_OF_RANDOM_BYTES,
} from './hash-password.service';

describe('HashPasswordService', () => {
  let service: HashPasswordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HashPasswordService],
    }).compile();

    service = module.get(HashPasswordService);
  });

  it('can create an instance of hashPasswordService', async () => {
    expect(service).toBeDefined();
  });

  it('the type of salt must be string', () => {
    const salt = service.createSalt();
    expect(typeof salt).toBe('string');
  });

  it('salt must be encoded in hex', () => {
    const salt = service.createSalt();
    expect(/^[0-9a-fA-F]+$/.test(salt)).toBe(true);
  });

  it('the type of hash must be string', async () => {
    const hash = await service.createHashWithSalt('password', 'salt');
    expect(typeof hash).toBe('string');
  });

  it('result of hashed password must be joined by "."', async () => {
    const hashPassword = await service.hashPassword('password');
    const [salt, hash] = hashPassword.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    expect(salt).toHaveLength(SIZE_OF_RANDOM_BYTES * 2);
    expect(hash).toHaveLength(KEY_LENGTH * 2);
  });
});
