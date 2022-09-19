import { faker } from "@faker-js/faker";

export default function generateNewUser() {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    password,
    repeat_password: password,
  };
}
