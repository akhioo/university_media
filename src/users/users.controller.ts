import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services';
import { SignUpDTO } from './dto';
import { LoginDTO } from './dto';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async onUserSignUp(@Body() signUpDTO: SignUpDTO) {
    return await this.authService.signUp(signUpDTO);
  }

  @HttpCode(202)
  @Post('login')
  async onUserLogin(@Body() loginDTO: LoginDTO) {
    return await this.authService.logIn(loginDTO);
  }
}
