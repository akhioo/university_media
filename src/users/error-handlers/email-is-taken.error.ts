import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailIsTakenError extends HttpException {
  constructor() {
    super(
      'The provided email is already used by another account.',
      HttpStatus.CONFLICT
    );
  }
}