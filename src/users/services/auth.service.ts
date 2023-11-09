import { UsersService } from './users.service';
import { SignUpDTO } from '../dto/signUp.dto';
import { AuthenticatedUserInterface } from '../interfaces/authenticated-user.interface';
import * as owasp from 'owasp-password-strength-test';
import { PasswordIsWeakError } from '../error-handlers/password-is-weak.error';
import { sign } from 'jsonwebtoken';
import * as process from 'process';
import { LoginDTO } from '../dto/login.dto';
import { UserEntity } from '../entities';
import { LoginAuditService } from './login-audit.service';

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginAuditService: LoginAuditService,
  ) {}

  public async signUp(
    signUpDTO: SignUpDTO,
  ): Promise<AuthenticatedUserInterface> {
    await this.verifyPasswordStrength(signUpDTO.password);

    const user = await this.usersService.createUser(signUpDTO);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      accessToken: sign(user.id.toString(), process.env.JWT_SECRET),
    };
  }

  public async logIn(loginDTO: LoginDTO): Promise<AuthenticatedUserInterface> {
    const user = await this.usersService.findByEmailAndPassword(loginDTO);
    return await this._proceedWithLogin(user);
  }

  private async verifyPasswordStrength(password: string) {
    const testResult = owasp.test(password);

    if (testResult.errors.length) {
      throw new PasswordIsWeakError(testResult.errors);
    }
  }

  private async _proceedWithLogin(
    user: UserEntity,
  ): Promise<AuthenticatedUserInterface> {
    await this.loginAuditService.recordLogin(user.id);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      accessToken: sign(user.id.toString(), process.env.JWT_SECRET),
    };
  }
}
