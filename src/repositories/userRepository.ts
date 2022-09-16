import { prisma } from "../config/database";
import { UserInsertData } from "../types/userTypes";

export async function insert(userData: UserInsertData) {
  await prisma.users.create({ data: userData });
}

export async function findByEmail(email: string) {
  return await prisma.users.findUnique({ where: { email } });
}
