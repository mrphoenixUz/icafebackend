import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuItem } from "./entities/menu-item.entity";
import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}