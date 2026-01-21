import { Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

// POST /auth/register - create new user
router.post("/register", register);

// POST /auth/login - handled by authController.login (returns JWT token + user)
router.post("/login", login);

export default router;
