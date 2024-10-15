import bcrypt from "bcryptjs";

export const saltAndHashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
