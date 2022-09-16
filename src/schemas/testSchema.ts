import joi from "joi";
import { TestInsertData } from "../types/testsTypes";

export const testSchema = joi.object<TestInsertData>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().greater(0).required(),
  teacherDisciplineId: joi.number().greater(0).required(),
});
