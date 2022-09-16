import * as userRepository from "../repositories/userRepository";
import { User, UserInsertData } from "../types/userTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(newUser: UserInsertData) {
  const { email, password }: UserInsertData = newUser;

  await checkSignUpEmail(email);

  const passwordHash: string = generateEncryptedPassword(password);

  const userData: UserInsertData = {
    email,
    password: passwordHash,
  };

  await userRepository.insert(userData);
}

export async function signIn(user: UserInsertData) {
  const { email, password }: UserInsertData = user;
  const userData: User = await getUserByEmail(email);

  checkUser(userData);
  checkSignInPassword(password, userData.password);

  const token: string = generateJwtToken(userData.id);

  return token;
}

async function checkSignUpEmail(email: string) {
  const user: any = await getUserByEmail(email);
  if (user) throw { type: "Conflict", message: "This email is already in use" };
}

async function getUserByEmail(email: string): Promise<User> {
  return await userRepository.findByEmail(email);
}

function generateEncryptedPassword(password: string): string {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
}

function checkUser(user: User) {
  if (!user) throw { type: "Not Found", message: "User not found" };
}

function checkSignInPassword(password: string, passwordHash: string) {
  if (!bcrypt.compareSync(password, passwordHash))
    throw { type: "Unauthorized", message: "Incorrect password" };
}

function generateJwtToken(userId: number): string {
  const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";
  const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

  const payload = {
    id: 1,
    userId,
    nivel: 1,
  };

  const jwtConfig = {
    expiresIn: EXPIRES_IN,
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
}
