import { Router } from "express";
import { makeCreateUserController } from "../../../../src/container/createUserFactory";

const router = Router();

// POST /api/users
router.post("/users/signUp", (req, res) => {
  return makeCreateUserController().handle(req, res);
});

export default router;
