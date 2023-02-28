import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

const auth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Authentication is not correct" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { userId: payload?.id, email: payload?.email };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Authentication is not correct" });
  }
};

export default auth;
