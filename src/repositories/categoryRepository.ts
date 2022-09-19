import { prisma } from "../config/database";

export async function findById(id: number): Promise<any> {
  return await prisma.categories.findUnique({ where: { id } });
}
