import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../types";
import { UserStatic } from "../types";

export const hashedPassword = (password: string) => {
  const hashed = bcrypt.hash(password, 12);
  return hashed;
};

export const comparePassword = (password: string, userPassword: string) => {
  const doesthePasswordMatch = bcrypt.compare(password, userPassword);
  return doesthePasswordMatch;
};

export const getUserByEmail = (data: UserStatic, email: string) => {
  return data.findOne({
    where: {
      email: email,
    },
  });
};

export const getToken = (result: UserAttributes) => {
  return jwt.sign(
    { email: result.email, id: result.id },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
