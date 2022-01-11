import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user-register.dto';
import { RoleService } from '../role/role.service';
import { generateRandomInt } from 'src/utils/generate-code';
import { AccountValidation } from '../code-validate/entities/account-validation.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly roleService: RoleService,

    private connection: Connection,
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
    const { email } = createUserRegister;

    const userExist = await this.checkEmail(email);

    if (userExist) {
      throw new HttpException(
        'Este email já está sendo utilizado por outro usuário',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.connection.transaction(
      async (transactionalEntityManager) => {
        const role = await this.roleService.getBySlug('user');

        if (!role) {
          throw new NotFoundException(`${role} not exist!`);
        }

        const generatedCode = generateRandomInt(1000, 9999);

        const userToCreate = this.usersRepository.create(createUserRegister);

        userToCreate.role = role;

        userToCreate.password = 'xpto_izifit';

        const user = await transactionalEntityManager.save(userToCreate);

        const userCreated = transactionalEntityManager.create(
          AccountValidation,
          {
            user,
            code: generatedCode,
          },
        );

        const newUserTransaction = await transactionalEntityManager.save(
          userCreated,
        );

        //ENVIAR EMAIL

        return newUserTransaction.user;
      },
    );

    return newUser;
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
