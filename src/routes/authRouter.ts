import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import { authSchema } from "../schemas/authSchema";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBodySchemaMiddleware(authSchema),
  authController.signUp
);

authRouter.post(
  "/signin",
  validateBodySchemaMiddleware(authSchema),
  authController.signIn
);

export default authRouter;
