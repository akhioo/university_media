import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { Repository } from "typeorm";
import { SignUpDTO } from "./dto/signUp.dto";
import { EmailIsTakenError } from "./error-handlers/email-is-taken.error";
import { encrypt } from "./helpers/password.helper";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  public async createUser(signUpDTO: SignUpDTO): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({ email: signUpDTO.email });

    if (existingUser) {
      throw new EmailIsTakenError();
    } else {
      const user = this.userRepository.create()
      user.email = signUpDTO.email
      user.username = signUpDTO.username
      user.password = await encrypt(signUpDTO.password)

      await this.userRepository.save(user)
      return user
    }
  }
}
