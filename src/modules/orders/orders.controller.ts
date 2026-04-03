import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../../common/enums/order-status.enum';

@Controller('orders')
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  getAll(@Query('status') status?: OrderStatus) {
    if (status) return this.service.findByStatus(status);
    return this.service.findAll();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: OrderStatus,
  ) {
    return this.service.updateStatus(id, status);
  }
}