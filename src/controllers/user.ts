import UserModel from "../models/user";
import { Request, Response } from "express";
import { getUserByEmail, hashedPassword, getToken, comparePassword } from "../utils/index";
import { userTransformer } from "../transformers/user";
import { UserStatic } from "../types";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email, username, password, repeatPassword } = req.body;

  try {
    if (!username || !email || !password || !repeatPassword) {
      return res.status(404).json({ msg: "All fields are required" });
    }

    const oldUser = await getUserByEmail(UserModel as UserStatic, email);
    const hashed = await hashedPassword(password);

    if (oldUser) {
      return res.status(404).json({ msg: "User already exist" });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ msg: "Password does not match" });
    }
    const result = await UserModel.create({
      username,
      email,
      password: hashed,
    });

    const token = getToken(result);

    if (!token) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    res.status(200).json({ result: userTransformer(result), token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};


export const signin = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res
        .status(404)
        .json({ status: "ok", msg: "Please provide email and password" });
    }
    const oldUser = await getUserByEmail(UserModel as UserStatic, email);

    const isPasswordCorrect = await comparePassword(password, oldUser.password);

    if (!oldUser) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = getToken(oldUser);

    if (!token) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    res.status(200).json({ result: userTransformer(oldUser), token });
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};