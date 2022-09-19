import { prisma } from "../src/config/database";
import generateValidNewTest from "./factories/testFactory";
import app from "../src/app";
import request from "supertest";

describe("POST /tests", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 201 and the registered test when creating a valid test", async () => {
    const newTest = generateValidNewTest();

    const response = await request(app).post("/tests").send(newTest);
    const createdTest = response.body;
    delete createdTest.id;

    expect(response.status).toEqual(201);
    expect(createdTest).toEqual(newTest);
  });

  it("should return status code 404 and error message when creating new test with category id not found", async () => {
    const newTest = generateValidNewTest();
    newTest.categoryId = 999999999;

    const response = await request(app).post("/tests").send(newTest);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual("CategoryId not found");
  });

  it("should return status code 404 and error message when creating new test with teacher discipline id not found", async () => {
    const newTest = generateValidNewTest();
    newTest.teacherDisciplineId = 999999999;

    const response = await request(app).post("/tests").send(newTest);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual("TeacherDisciplineId not found");
  });

  it("should return status code 422 when invalid new test body format", async () => {
    const response = await request(app).post("/tests");

    expect(response.status).toEqual(422);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
