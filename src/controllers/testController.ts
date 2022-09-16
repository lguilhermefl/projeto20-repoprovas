import { Request, Response } from "express";
import { Test, TestInsertData } from "../types/testTypes";
import * as testService from "../services/testService";

export async function insert(req: Request, res: Response) {
  const testData: TestInsertData = req.body;
  const newTest: Test = await testService.insert(testData);

  res.status(201).send(newTest);
}
