import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderDto {
  @ApiProperty() tableId: number;

  @ApiProperty() items: {
    menuItemId: number;
    quantity: number;
    price: number;
  }[];
}