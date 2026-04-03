import { Controller, Get, Post, Body } from '@nestjs/common';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private service: TablesService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}