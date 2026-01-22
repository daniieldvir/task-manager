import { Router } from "express";
import { login, logout } from "../controllers/authController";

const router = Router();


// POST /auth/login - handled by authController.login (returns JWT token + user)
router.post("/login", login);

// POST /auth/logout - handled by authController.logout
router.post("/logout", logout);

export default router;
