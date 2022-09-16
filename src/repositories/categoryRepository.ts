import { prisma } from "../config/database";
import { Category } from "../types/categoryTypes";

export async function findById(id: number): Promise<Category> {
  return await prisma.categories.findUnique({ where: { id } });
}
