import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './dto/create-role-dto';
import { Role } from './entities/role.entity';
import slugify from 'slugify';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async index(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async create(body: CreateRoleDTO): Promise<Role> {
    const { name } = body;
    const nameLower = name.toLowerCase();
    const slug = slugify(nameLower);

    const checkUSingleTitle = await this.getBySlug(slug);

    if (checkUSingleTitle) {
      throw new HttpException(
        'Já existe uma role cadastrada com esse título!',
        HttpStatus.CONFLICT,
      );
    }

    const role = this.roleRepository.create({
      name,
      slug,
    });

    return await this.roleRepository.save(role);
  }

  async getById(id: string): Promise<Role> {
    return this.roleRepository.findOne({ id }, { relations: ['permissions'] });
  }

  async update(id: string, body: UpdateRoleDto): Promise<Role> {
    const { name } = body;
    const nameLower = name.toLowerCase();
    const slug = slugify(nameLower);

    const checkUSingleName = await this.getBySlug(slug);

    if (checkUSingleName && checkUSingleName.id !== id) {
      throw new HttpException(
        'Já existe uma role cadastrada com esse título!',
        HttpStatus.CONFLICT,
      );
    }

    const roleUp = this.roleRepository.create({
      name,
      slug,
    });

    await this.roleRepository.update(id, roleUp);

    return this.roleRepository.findOne({ id });
  }

  async getBySlug(slug: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({ slug });
    if (!role) {
      return null;
    }
    return role;
  }
}
