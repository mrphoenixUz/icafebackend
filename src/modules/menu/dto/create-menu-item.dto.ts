import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty() 
  description: string;

  @IsNumber()
  @ApiProperty() 
  price: number;

  @IsString()
  @ApiProperty() 
  category: string;

  @IsOptional()
  @IsString()
  @ApiProperty() 
  imageUrl?: string;
}