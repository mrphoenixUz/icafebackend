import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() price: number;
  @ApiProperty() category: string;
  @ApiProperty() imageUrl?: string;
}