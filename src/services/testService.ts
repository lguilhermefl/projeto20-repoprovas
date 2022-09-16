import * as testRepository from "../repositories/testRepository";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";
import * as categoryRepository from "../repositories/categoryRepository";

import { TestInsertData, Test } from "../types/testTypes";
import { Category } from "../types/categoryTypes";
import { TeacherDiscipline } from "../types/teacherDisciplineTypes";

export async function insert(testData: TestInsertData): Promise<Test> {
  const category: Category = await getCategoryById(testData.categoryId);

  checkCategory(category);

  const teacherDiscipline: TeacherDiscipline = await getTeacherDisciplineById(
    testData.teacherDisciplineId
  );

  checkTeacherDiscipline(teacherDiscipline);

  return await testRepository.insert(testData);
}

async function getCategoryById(id: number): Promise<Category> {
  return await categoryRepository.findById(id);
}

function checkCategory(category: Category) {
  if (!category) throw { type: "Not Found", message: "CategoryId not found" };
}

async function getTeacherDisciplineById(
  id: number
): Promise<TeacherDiscipline> {
  return await teacherDisciplineRepository.findById(id);
}

function checkTeacherDiscipline(teacherDiscipline: TeacherDiscipline) {
  if (!teacherDiscipline)
    throw { type: "Not Found", message: "TeacherDisciplineId not found" };
}
