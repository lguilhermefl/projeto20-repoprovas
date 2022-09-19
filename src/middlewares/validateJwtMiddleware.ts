import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function validateJWT() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      throw {
        type: "Unauthorized",
        message: "Authorization header is required",
      };
    }

    const isAuthorizationCorrectlyFormated = authorization.includes("Bearer ");

    if (!isAuthorizationCorrectlyFormated) {
      throw {
        type: "Unauthorized",
        message: "Token is not in the right format",
      };
    }

    const token = authorization.trim().replace("Bearer ", "");

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";

    try {
      const decodedPayload = jwt.verify(token, SECRET);

      res.locals.tokenPayload = decodedPayload;
      next();
    } catch (error) {
      return res.status(401).send("Token is not valid");
    }
  };
}
