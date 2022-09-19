import { prisma } from "../src/config/database";
import generateValidNewTest from "./factories/testFactory";
import app from "../src/app";
import request from "supertest";

describe("POST /tests", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 201 when creating a valid test", async () => {
    const newTest = generateValidNewTest();

    const response = await request(app).post("/tests").send(newTest);
    const testCreated = response.body;
    delete testCreated.id;

    expect(response.status).toEqual(201);
    expect(testCreated).toEqual(newTest);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
