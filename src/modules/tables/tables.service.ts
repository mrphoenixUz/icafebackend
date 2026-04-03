import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private repo: Repository<Table>,
  ) {}

  create(name: string) {
    const table = this.repo.create({ name });
    return this.repo.save(table);
  }

  findAll() {
    return this.repo.find();
  }
}   