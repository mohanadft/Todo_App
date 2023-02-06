import { hashSync, compareSync } from 'bcrypt';

const SALT = 10;

const hashPassword = (password: string) => {
  const newPassword = hashSync(password, SALT);
  return newPassword;
};

const compare = (password: string, encrypted: string) => {
  return compareSync(password, encrypted);
};

export { compare, hashPassword };
