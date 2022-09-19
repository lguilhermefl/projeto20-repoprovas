import { prisma } from "../src/config/database";
import generateNewUser from "./factories/authFactory";
import app from "../src/app";
import request from "supertest";

describe("POST /signup", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 200", async () => {
    const newUser = generateNewUser();

    const result = await request(app).post("/signup").send(newUser);

    expect(result.status).toEqual(201);
  });

  it("should return status code 409", async () => {
    const newUser = generateNewUser();

    await request(app).post("/signup").send(newUser);
    const result = await request(app).post("/signup").send(newUser);

    expect(result.status).toEqual(409);
    expect(result.text).toEqual("This email is already in use");
  });

  it("should return status code 422", async () => {
    const result = await request(app).post("/signup");

    expect(result.status).toEqual(422);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
