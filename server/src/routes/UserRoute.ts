import express, {Request, Response} from "express";
import { handleGetAllUsers, handleGetUserDetails, handleUpdateUser, handleCreateGuestUser } from "../controllers/userController";
import { checkToken, verifyRoute } from "../middlewares/authMiddleware";


const router = express.Router();


router.get("/", checkToken, verifyRoute,  handleGetAllUsers)   //Get all users (Admin only)
router.get("/:id", checkToken, verifyRoute, handleGetUserDetails);  //Get user profile by ID
router.patch("/:id", checkToken, verifyRoute, handleUpdateUser);   //Update user profile
router.delete("/:id", () => {});   //Delete user
router.post("/guest", handleCreateGuestUser);  //Create guest user

export default router;
