import express from "express";
import {
  registerController,
  googleLoginController,
} from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", registerController);
router.post("/google-login", googleLoginController);
export default router;
