import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const role = client.handshake.query.role;

    if (role === 'kitchen') client.join('kitchen');
    if (role === 'waiter') client.join('waiter');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // 🔥 EMIT NEW ORDER
  emitNewOrder(order: any) {
    this.server.to('kitchen').emit('order:new', order);
  }

  emitOrderUpdate(order: any) {
    if (order.status === 'ready') {
      this.server.to('waiter').emit('order:ready', order);
    } else {
      this.server.to('kitchen').emit('order:update', order);
    }
  }
}
