import { Injectable } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';

@Injectable()
export class RealtimeService {
  constructor(private gateway: RealtimeGateway) {}

  newOrder(order: any) {
    this.gateway.emitNewOrder(order);
  }

  updateOrder(order: any) {
    this.gateway.emitOrderUpdate(order);
  }
}