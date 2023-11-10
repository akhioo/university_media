import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services';
import { SignupDto } from './dto';
import { LoginDTO } from './dto';

@Controller('users')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async onUserSignUp(@Body() signUpDTO: SignupDto) {
    return await this.authService.signUp(signUpDTO);
  }

  @HttpCode(202)
  @Post('login')
  async onUserLogin(@Body() loginDTO: LoginDTO) {
    return await this.authService.logIn(loginDTO);
  }
}
