import express from "express";
import { handleLoginUser, handleRegisterUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", handleRegisterUser)   //Register new user
router.post("/login", handleLoginUser)  //Login user
router.post("/logout", () => { })   //Logout user
router.post("/refresh", () => { })   //Refresh token
router.post("/forgot-password", () => { })   //Request password reset
router.post("/reset-password", () => { })  //Reset password

export default router;