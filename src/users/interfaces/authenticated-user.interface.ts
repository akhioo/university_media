export interface AuthenticatedUserInterface {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly accessToken: string;
}
