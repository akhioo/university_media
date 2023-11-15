import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginRecordEntity } from "../entities";
import { Repository } from "typeorm";
import moment from "moment";

@Injectable()
export class LoginAuditService {
  constructor(
    @InjectRepository(LoginRecordEntity)
    private readonly loginRecordRepository: Repository<LoginRecordEntity>
  ) {}

  public async recordLogin(userId: number) {
    const loginEvent = this.loginRecordRepository.create();

    loginEvent.userId = userId;
    loginEvent.timestamp = moment().valueOf().toString();

    await this.loginRecordRepository.save(loginEvent);
  }
}
