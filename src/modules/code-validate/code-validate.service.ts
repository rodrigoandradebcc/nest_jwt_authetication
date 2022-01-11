import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountValidation } from './entities/account-validation.entity';
@Injectable()
export class CodeValidateService {
  constructor(
    @InjectRepository(AccountValidation)
    private readonly accountValidationRepository: Repository<AccountValidation>,
  ) {}

  //   async create(body: CreateCodeDTO): Promise<AccountValidation> {
  //     const { name } = body;
  //     const nameLower = name.toLowerCase();
  //     const slug = slugify(nameLower);

  //     const checkUSingleTitle = await this.getBySlug(slug);

  //     if (checkUSingleTitle) {
  //       throw new HttpException(
  //         'Já existe uma role cadastrada com esse título!',
  //         HttpStatus.CONFLICT,
  //       );
  //     }
}
