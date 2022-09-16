import { Request, Response } from "express";
import { UserBodyData, UserInsertData } from "../types/userTypes";
import * as authService from "../services/authService";

export async function signUp(req: Request, res: Response) {
  const newUser: UserBodyData = req.body;
  delete newUser.repeat_password;

  await authService.signUp(newUser);

  res.status(201).send("User created successfully");
}

export async function signIn(req: Request, res: Response) {
  const user: UserInsertData = req.body;

  const token: string = await authService.signIn(user);

  res.status(200).send({ token });
}
