import { faker } from "@faker-js/faker";

export default function generateValidNewTest() {
  return {
    name: faker.random.words(2),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 3 }),
    teacherDisciplineId: faker.datatype.number({ min: 1, max: 6 }),
  };
}
