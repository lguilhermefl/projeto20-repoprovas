import { Router } from "express";
import validateBodySchemaMiddleware from "../middlewares/validateBodySchema";
import validateJWT from "../middlewares/validateJwtMiddleware";
import { testSchema } from "../schemas/testSchema";
import * as testController from "../controllers/testController";

const testRouter = Router();

testRouter.use(validateJWT());
testRouter.post(
  "/tests",
  validateBodySchemaMiddleware(testSchema),
  testController.insert
);
testRouter.get("/tests/byterms", testController.getAllByTerms);

export default testRouter;
