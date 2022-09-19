import { faker } from "@faker-js/faker";
import app from "../../src/app";
import request from "supertest";
import generateNewUser from "./authFactory";
import { UserBodyData, UserInsertData } from "../../src/types/userTypes";
import { TestInsertData } from "../../src/types/testTypes";

export function generateValidNewTest(): TestInsertData {
  return {
    name: faker.random.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 3 }),
    teacherDisciplineId: faker.datatype.number({ min: 1, max: 6 }),
  };
}

async function createNewUser(): Promise<UserInsertData> {
  const newUser: UserBodyData = generateNewUser();
  await request(app).post("/signup").send(newUser);
  delete newUser.repeat_password;
  return newUser;
}

export async function getNewUserToken(): Promise<string> {
  const newUser: UserInsertData = await createNewUser();
  const response = await request(app).post("/signin").send(newUser);
  return response.body.token;
}

export async function getFormatedAuthorization(): Promise<string> {
  const token: string = await getNewUserToken();
  return `Bearer ${token}`;
}
