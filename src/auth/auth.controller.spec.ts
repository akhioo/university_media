import { AuthController } from './auth.controller';
import { AuthService } from './services';
import { Test, TestingModule } from '@nestjs/testing';
import { SignupDto } from './dto';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users';
import { LoginRecordEntity } from './entities';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService],
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'akhio',
          password: 'hasonkay05',
          database: 'university_media',
          entities: [UserEntity, LoginRecordEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity]),
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('onUserSignUp', () => {
    it('should call authService.signUp with the provided data', async () => {
      const signUpDTO: SignupDto = {
        email: 'jack@gmail.com',
        username: 'JackDen',
        password: 'JackDenison.1982',
      };

      jest.spyOn(authService, 'signUp');

      const result = await authController.onUserSignUp(signUpDTO);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDTO);
    });
  });
});
