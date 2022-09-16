import { prisma } from "../config/database";
import { TestInsertData, Test } from "../types/testTypes";

export async function insert(testData: TestInsertData): Promise<Test> {
  return await prisma.tests.create({ data: testData });
}

// export async function getTests() {
//   await prisma.$queryRaw`
//     select t.id, t.name as período
//     array(
//         select d.id, d.name as disciplina
//         array(
//             select c.id, c.name as tipo
//             array(
//                 select jsonb_build_object('idProva', tests.id, 'nomeProva', tests.name, 'idProfessor(a)', teachers.id, 'nomeProfessor(a)', teachers.name)
//                 from tests
//                 where tests.categoryId=c.id
//             ) as provas
//         ) as tipos
//     ) as disciplinas
//     from terms t
//   `;
// }