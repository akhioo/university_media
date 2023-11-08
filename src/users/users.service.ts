import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities";
import { Repository } from "typeorm";
import { SignUpDTO } from "./dto/signUp.dto";
import { EmailIsTakenError } from "./error-handlers/email-is-taken.error";
import { encrypt, matchPassword } from "./helpers/password.helper";
import { LoginDTO } from "./dto/login.dto";
import { UserNotFoundError } from "./error-handlers/user-not-found.error";
import { PasswordDoesntMatchError } from "./error-handlers/password-doesnt-match.error";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  public async createUser(signUpDTO: SignUpDTO): Promise<UserEntity> {
    const existingUser = this._findByAttr("email", signUpDTO.email);

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

  public async findByEmailAndPassword(loginDTO: LoginDTO): Promise<UserEntity> {
    const user = await this._findByAttr('email', loginDTO.email);

    if (!user) {
      throw new UserNotFoundError();
    } else {
      await this._verifyUserPassword(user.password, loginDTO.password);
      return user;
    }
  }

  private async _findByAttr(attr: string, value: any) {
    return await this.userRepository.findOne({ [attr]: value });
  }

  private async _verifyUserPassword(password: string, inputPassword: string) {
    const passwordDoesMatch = await matchPassword(password, inputPassword);

    if (!passwordDoesMatch) {
      throw new PasswordDoesntMatchError();
    }
  }
}
