import { prisma } from "../src/config/database";
import {
  generateValidNewTest,
  getNewUserToken,
  getFormatedAuthorization,
} from "./factories/testFactory";
import app from "../src/app";
import request from "supertest";

describe("POST /tests", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 201 and the registered test when creating a valid test", async () => {
    const authorization = await getFormatedAuthorization();
    const newTest = generateValidNewTest();

    const response = await request(app)
      .post("/tests")
      .send(newTest)
      .set("Authorization", authorization);
    const createdTest = response.body;
    delete createdTest.id;

    expect(response.status).toEqual(201);
    expect(createdTest).toEqual(newTest);
  });

  it("should return status code 404 and error message when creating new test with category id not found", async () => {
    const authorization = await getFormatedAuthorization();
    const newTest = generateValidNewTest();
    newTest.categoryId = 999999999;

    const response = await request(app)
      .post("/tests")
      .send(newTest)
      .set("Authorization", authorization);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual("CategoryId not found");
  });

  it("should return status code 404 and error message when creating new test with teacher discipline id not found", async () => {
    const authorization = await getFormatedAuthorization();
    const newTest = generateValidNewTest();
    newTest.teacherDisciplineId = 999999999;

    const response = await request(app)
      .post("/tests")
      .send(newTest)
      .set("Authorization", authorization);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual("TeacherDisciplineId not found");
  });

  it("should return status code 401 and error message when trying to create test without authorization headers", async () => {
    const newTest = generateValidNewTest();

    const response = await request(app).post("/tests").send(newTest);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual("Authorization header is required");
  });

  it("should return status code 401 and error message when trying to create test with invalid Bearer authorization format", async () => {
    const token = await getNewUserToken();
    const newTest = generateValidNewTest();

    const response = await request(app)
      .post("/tests")
      .send(newTest)
      .set("Authorization", token);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual("Token is not in the right format");
  });

  it("should return status code 401 and error message when trying to create test with invalid token in authorization headers", async () => {
    const authorization = "Bearer invalid token";
    const newTest = generateValidNewTest();

    const response = await request(app)
      .post("/tests")
      .send(newTest)
      .set("Authorization", authorization);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual("Token is not valid");
  });

  it("should return status code 422 when invalid new test body format", async () => {
    const authorization = await getFormatedAuthorization();
    const response = await request(app)
      .post("/tests")
      .set("Authorization", authorization);

    expect(response.status).toEqual(422);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

describe("GET /tests/byterms", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 200 and body in array format with at least 1 test", async () => {
    const authorization = await getFormatedAuthorization();
    const newTest = generateValidNewTest();

    await request(app).post("/tests").send(newTest);
    const response = await request(app)
      .get("/tests/byterms")
      .set("Authorization", authorization);
    const testsSize = response.body.length;

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(testsSize).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
