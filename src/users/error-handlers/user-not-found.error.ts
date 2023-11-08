import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundError extends HttpException {
  constructor() {
    super(
      'The user was not found',
      HttpStatus.NOT_FOUND,
    );
  }
}