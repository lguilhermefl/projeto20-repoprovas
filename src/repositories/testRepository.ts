import { prisma } from "../config/database";
import { TestInsertData, Test } from "../types/testTypes";

export async function insert(testData: TestInsertData): Promise<Test> {
  return await prisma.tests.create({ data: testData });
}

export async function findAllTestsByTerms(): Promise<any> {
  return await prisma.$queryRaw`
  select t.id, t.number as term, array(
    select jsonb_build_object('id', d.id, 'disciplineName', d.name, 'categories',
      (select json_agg(
          jsonb_build_object(
            'id', c.id, 'categoryName', c.name, 'tests', (
              select coalesce(json_agg(
                jsonb_build_object(
                  'testId', ts.id, 'testName', ts.name, 'teacherId', tc.id, 'teacherName', tc.name
                )
              ), '[]') from tests ts 
              join "teachersDisciplines" td 
              on td.id=ts."teacherDisciplineId" 
              join teachers tc 
              on tc.id=td."teacherId" 
              where ts."categoryId"=c.id and td."disciplineId"=d.id
            )
          ) 
        ) from categories c
      )
     ) from disciplines d
     where d."termId"=t.id
  ) as disciplines
  from terms t
  `;
}
