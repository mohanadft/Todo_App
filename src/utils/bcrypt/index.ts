import { hashSync, compareSync } from 'bcrypt';

const SALT = 10;

function hashPassword(password: string) {
  const newPassword = hashSync(password, SALT);
  return newPassword;
}

function compare(password: string, hash: string) {
  return compareSync(password, hash);
}

export { compare, hashPassword };
