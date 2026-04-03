export class CreateOrderDto {
  tableId: number;

  items: {
    menuItemId: number;
    quantity: number;
    price: number;
  }[];
}