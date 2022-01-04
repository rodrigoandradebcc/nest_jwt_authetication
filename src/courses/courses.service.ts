import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: string) {
    const course = this.coursesRepository.findOne(id);

    if (!course) {
      //   throw new HttpException(`Course ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Course ${id} not found`);
    }

    return course;
  }

  create(createCourseDTO: CreateCourseDto) {
    const course = this.coursesRepository.create(createCourseDTO);
    return this.coursesRepository.save(course);
  }

  async update(id: string, updateCourseDTO: UpdateCourseDto) {
    const course = this.coursesRepository.preload({
      id: +id,
      ...updateCourseDTO,
    });

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return this.coursesRepository.save(updateCourseDTO);
  }

  async remove(id: string) {
    const course = await this.coursesRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Course ${id} not found`);
    }

    return this.coursesRepository.remove(course);
  }
}
