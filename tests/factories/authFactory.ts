import { faker } from "@faker-js/faker";
import { UserBodyData } from "../../src/types/userTypes";

export default function generateNewUser(): UserBodyData {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    password,
    repeat_password: password,
  };
}
