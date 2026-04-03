import { Body, Controller, Get, Post } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";

@Controller('menu')
export class MenuController {
  constructor(private service: MenuService) {}

  @Post()
  create(@Body() dto: CreateMenuItemDto) {
    return this.service.create(dto);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }
}