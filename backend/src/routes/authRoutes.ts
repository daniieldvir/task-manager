import { Router } from "express";
import { login, logout, register } from "../controllers/authController";

const router = Router();

// POST /auth/register - create new user
router.post("/register", register);

// POST /auth/login - handled by authController.login (returns JWT token + user)
router.post("/login", login);

// POST /auth/logout - handled by authController.logout
router.post("/logout", logout);

export default router;
