import HttpException from "../exceptions/HttpExceptions";
import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

export default errorHandlerMiddleware;
