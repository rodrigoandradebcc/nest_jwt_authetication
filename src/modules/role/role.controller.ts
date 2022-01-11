import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role-dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async index(): Promise<Role[]> {
    return this.roleService.index();
  }

  @Post()
  async store(@Body() body: CreateRoleDTO): Promise<Role> {
    console.log('HEAUHAEUHAEUAEHAEUHAE', body);
    return this.roleService.create(body);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Role> {
    return this.roleService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, body);
  }
}
