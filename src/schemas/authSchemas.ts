import joi from "joi";
import { UserBodyData } from "../types/userTypes";

export const signUpSchema = joi
  .object<UserBodyData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    repeat_password: joi.ref("password"),
  })
  .with("password", "repeat_password");

export const signInSchema = joi.object<UserBodyData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
