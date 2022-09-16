import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.type) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }
  return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType: string) {
  if (errorType === "Conflict") return 409;
  if (errorType === "Not Found") return 404;
  if (errorType === "Unauthorized") return 401;

  return 400;
}
