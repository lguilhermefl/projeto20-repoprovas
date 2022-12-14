import { prisma } from "../src/config/database";
import generateNewUser from "./factories/authFactory";
import app from "../src/app";
import request from "supertest";

describe("POST /signup", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 201 when creating valid user", async () => {
    const newUser = generateNewUser();

    const response = await request(app).post("/signup").send(newUser);

    expect(response.status).toEqual(201);
  });

  it("should return status code 409 and error message when email already registered", async () => {
    const newUser = generateNewUser();

    await request(app).post("/signup").send(newUser);
    const response = await request(app).post("/signup").send(newUser);

    expect(response.status).toEqual(409);
    expect(response.text).toEqual("This email is already in use");
  });

  it("should return status code 422 when invalid body format", async () => {
    const response = await request(app).post("/signup");

    expect(response.status).toEqual(422);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});

describe("POST /signin", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  });

  it("should return status code 200 and token when sign in is successful", async () => {
    const newUser = generateNewUser();

    await request(app).post("/signup").send(newUser);

    delete newUser.repeat_password;

    const userSignInResponse = await request(app).post("/signin").send(newUser);

    const token = userSignInResponse.body;

    expect(token).not.toBeFalsy();
    expect(userSignInResponse.status).toEqual(200);
  });

  it("should return status code 404 and error message when email is not registered", async () => {
    const newUser = generateNewUser();
    delete newUser.repeat_password;

    const response = await request(app).post("/signin").send(newUser);

    expect(response.status).toEqual(404);
    expect(response.text).toEqual("User not found");
  });

  it("should return status code 401 and error message when email is registered but password is incorrect", async () => {
    const newUser = generateNewUser();

    await request(app).post("/signup").send(newUser);
    delete newUser.repeat_password;
    newUser.password = "incorrect password";

    const response = await request(app).post("/signin").send(newUser);

    expect(response.status).toEqual(401);
    expect(response.text).toEqual("Incorrect password");
  });

  it("should return status code 422 when invalid new user body format", async () => {
    const response = await request(app).post("/signin");

    expect(response.status).toEqual(422);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
