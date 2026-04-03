import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuItem } from "./entities/menu-item.entity";
import { Repository } from "typeorm";
import { CreateMenuItemDto } from "./dto/create-menu-item.dto";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private repo: Repository<MenuItem>,
  ) {}

  create(dto: CreateMenuItemDto) {
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find();
  }
}