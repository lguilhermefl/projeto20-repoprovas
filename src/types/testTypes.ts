import { Tests } from "@prisma/client";

export type Test = Tests;
export type TestInsertData = Omit<Test, "id">;
