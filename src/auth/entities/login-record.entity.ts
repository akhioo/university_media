import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LoginRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  timestamp: string;
}
