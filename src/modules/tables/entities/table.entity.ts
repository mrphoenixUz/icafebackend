import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  qrCode: string;
}