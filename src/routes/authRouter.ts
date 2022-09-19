import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import { signUpSchema, signInSchema } from "../schemas/authSchemas";
import * as authController from "../controllers/authController";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBodySchemaMiddleware(signUpSchema),
  authController.signUp
);

authRouter.post(
  "/signin",
  validateBodySchemaMiddleware(signInSchema),
  authController.signIn
);

export default authRouter;
