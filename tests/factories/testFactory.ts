import { faker } from "@faker-js/faker";
import app from "../../src/app";
import request from "supertest";
import generateNewUser from "./authFactory";

export function generateValidNewTest(): any {
  return {
    name: faker.random.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 3 }),
    teacherDisciplineId: faker.datatype.number({ min: 1, max: 6 }),
  };
}

async function createNewUser(): Promise<any> {
  const newUser = generateNewUser();

  await request(app).post("/signup").send(newUser);
  delete newUser.repeat_password;
  return newUser;
}

export async function getNewUserToken(): Promise<any> {
  const newUser = await createNewUser();
  const response = await request(app).post("/signin").send(newUser);
  return response.body.token;
}

export async function getFormatedAuthorization(): Promise<any> {
  const token: string = await getNewUserToken();
  return `Bearer ${token}`;
}
