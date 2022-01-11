import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user-register.dto';
import { RoleService } from '../role/role.service';
import { generateRandomInt } from 'src/utils/generate-code';
import { getConnection } from 'typeorm';
import { AccountValidation } from '../code-validate/entities/account-validation.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(AccountValidation)
    private readonly accountValidationRepository: Repository<AccountValidation>,

    private readonly roleService: RoleService,
  ) {}

  // async create(createCourseDTO: CreateUserDto) {
  //   const { password } = createCourseDTO;
  //   const encryptedPassword = await bcrypt.hash(password, 10);

  //   const newUser = {
  //     ...createCourseDTO,
  //     password: encryptedPassword,
  //   };

  //   const user = this.usersRepository.create(newUser);
  //   return this.usersRepository.save(user);
  // }

  async createUserRegister(createUserRegister: UserRegisterDto) {
    const { email, full_name } = createUserRegister;
    const connection = getConnection();

    console.log('te3stadno', email);
    const userExist = await this.checkEmail(email);

    if (userExist) {
      throw new HttpException(
        'Este email já está sendo utilizado por outro usuário',
        HttpStatus.CONFLICT,
      );
    }

    const role = await this.roleService.getBySlug('user');

    if (!role) {
      throw new NotFoundException(`${role} not exist!`);
    }

    const queryRunner = connection.createQueryRunner();
  }

  async findOne(id: string) {
    const course = await this.usersRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return course;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }

  async checkEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
