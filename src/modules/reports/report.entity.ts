import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column()
  mileage: number;

  @ManyToOne(() => User)
  writer: User;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Report with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Report with id ', this.id);
  }

  @BeforeRemove()
  logRemove() {
    console.log('Removed Report with id ', this.id);
  }
}
