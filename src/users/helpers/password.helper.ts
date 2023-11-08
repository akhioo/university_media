import { compare, genSalt, hash } from "bcrypt";

const SALT_ROUNDS = 10;

export const encrypt = async (plainPasswordText: string) => {
  const salt = await genSalt(SALT_ROUNDS);
  return await hash(plainPasswordText, salt)
};

export const matchPassword = async (
  hashedPassword: string,
  plainTextPassword: string
) => {
  return await compare(hashedPassword, plainTextPassword);
};