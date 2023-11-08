import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 26 })
  password: string;
}
