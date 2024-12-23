import bcrypt from "bcrypt";
const hashPassword = (password: string): string => {
  const resultHashedPassword = bcrypt.hashSync(password, 10);
  return resultHashedPassword;
};

const comparePassword = (userPassword: string, dbPassword: string): boolean => {
  const comparePasswordResult = bcrypt.compareSync(userPassword, dbPassword);
  return comparePasswordResult;
};
export { comparePassword, hashPassword };
