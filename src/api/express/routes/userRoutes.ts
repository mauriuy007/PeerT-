import { Router } from "express";
import { CreateUserController } from "../controllers/User/CreateUserController";

const router = Router();

// POST /api/users
router.post(
  "/users",
  (req, res) => CreateUserController.handle(req, res)
);

export default router;
