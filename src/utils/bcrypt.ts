import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compare(rawPassword, hash);
}
