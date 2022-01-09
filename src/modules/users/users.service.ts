import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne(id: string) {
    const course = this.usersRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return course;
  }

  findByEmail(email: string) {
    const course = this.usersRepository.findOne(email);

    if (!course) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return course;
  }

  async create(createCourseDTO: CreateUserDto) {
    const { password } = createCourseDTO;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      ...createCourseDTO,
      password: encryptedPassword,
    };

    const user = this.usersRepository.create(newUser);
    return this.usersRepository.save(user);
  }
}
