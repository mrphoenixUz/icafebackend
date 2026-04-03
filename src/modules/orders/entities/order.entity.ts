import { OrderStatus } from "src/common/enums/order-status.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableId: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('decimal')
  total: number;

  @OneToMany(() => OrderItem, item => item.order, {
    cascade: true,
  })
  items: OrderItem[];
}