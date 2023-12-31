import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LoginRecordEntity } from "./auth";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "akhio",
      password: "hasonkay05",
      database: "university_media",
      entities: [UserEntity, LoginRecordEntity],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
