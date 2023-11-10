import { HttpException, HttpStatus } from "@nestjs/common";

export class NoJWTError extends HttpException {
  constructor() {
    super('Access token was not found', HttpStatus.FORBIDDEN);
  }
}
