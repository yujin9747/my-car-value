import { User } from '../entities/user.entity';

export interface UsersIservice {
  create(email: string, password: string): Promise<User>;
  findOne(id: number): Promise<User>;
  find(email: string): Promise<User[]>;
  update(id: number, attr: Partial<User>): Promise<User>;
  remove(id: number): Promise<User>;
}

export const UserService = Symbol('UserService');
