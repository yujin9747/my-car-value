import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

const scrypt = promisify(_scrypt);
export const SIZE_OF_RANDOM_BYTES = 8;
const ENCODING = 'hex';
export const KEY_LENGTH = 32;

@Injectable()
export class HashPasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = this.createSalt();
    const hash = await this.createHashWithSalt(password, salt);

    return salt + '.' + hash;
  }

  createSalt(): string {
    const bytes = randomBytes(SIZE_OF_RANDOM_BYTES);
    return bytes.toString(ENCODING);
  }

  async createHashWithSalt(password: string, salt: string): Promise<string> {
    const scriptedBytes = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
    return scriptedBytes.toString(ENCODING);
  }
}
