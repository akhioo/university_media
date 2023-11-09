import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordDoesntMatchError extends HttpException {
  constructor() {
    super("Passwords doesn't match", HttpStatus.FORBIDDEN);
  }
}
