import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./services";
import { UsersModule } from "../users/users.module";
import { LoginAuditService } from "./services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginRecordEntity } from "./entities";

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([LoginRecordEntity])],
  controllers: [AuthController],
  providers: [AuthService, LoginAuditService],
})
export class AuthModule {}
