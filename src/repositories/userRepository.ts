import { prisma } from "../config/database";
import { User, UserInsertData } from "../types/userTypes";

export async function insert(userData: UserInsertData) {
  await prisma.users.create({ data: userData });
}

export async function findByEmail(email: string): Promise<User> {
  return await prisma.users.findUnique({ where: { email } });
}
