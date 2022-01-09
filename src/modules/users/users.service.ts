import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  // create(createCourseDTO: CreateUserDto) {
  //     const user = this.usersRepository.create(createCourseDTO);
  //     return this.usersRepository.save(user);
  //   }
  create(createCourseDTO: CreateUserDto) {
    const user = this.usersRepository.create(createCourseDTO);
    return this.usersRepository.save(user);
  }
}
