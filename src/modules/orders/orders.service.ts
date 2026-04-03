import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../../common/enums/order-status.enum';
import { RealtimeService } from '../realtime/realtime.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,
    private realtime: RealtimeService,
  ) {}

  async create(dto: CreateOrderDto) {
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = this.repo.create({
      tableId: dto.tableId,
      total,
      items: dto.items,
    });

    this.realtime.newOrder(order);

    return order;
  }

  async updateStatus(id: number, status: OrderStatus) {
    await this.repo.update(id, { status });

    const updated = await this.repo.findOne({
      where: { id },
      relations: ['items'],
    });

    // 🚀 EMIT UPDATE
    this.realtime.updateOrder(updated);

    return updated;
  }

  async findAll() {
    return this.repo.find({
      relations: ['items'],
      order: { id: 'DESC' },
    });
  }

  async findByStatus(status: OrderStatus) {
    return this.repo.find({
      where: { status },
      relations: ['items'],
    });
  }
}
