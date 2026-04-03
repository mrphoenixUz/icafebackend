import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuItem } from "./entities/menu-item.entity";
import { Repository } from "typeorm";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";
import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private repo: Repository<MenuItem>,
  ) {}

  async create(dto: CreateMenuItemDto) {
    const item = this.repo.create(dto);
    return await this.repo.save(item);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async update(id: number, dto: UpdateMenuItemDto) {
    const item = await this.findOne(id);

    Object.assign(item, dto);
    return await this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return await this.repo.remove(item);
  }
}