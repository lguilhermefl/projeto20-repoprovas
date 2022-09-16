import joi from "joi";
import { UserBodyData } from "../types/userTypes";

export const authSchema = joi
  .object<UserBodyData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    repeat_password: joi.ref("password"),
  })
  .with("password", "repeat_password");
