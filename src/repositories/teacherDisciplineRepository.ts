import { prisma } from "../config/database";
import { TeacherDiscipline } from "../types/teacherDisciplineTypes";

export async function findById(id: number): Promise<TeacherDiscipline> {
  return await prisma.teachersDisciplines.findUnique({ where: { id } });
}
