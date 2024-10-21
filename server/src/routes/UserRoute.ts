import express, {Request, Response} from "express";
import { handleGetAllUsers, handleGetUserDetails, handleUpdateUser, handleCreateUser } from "../controllers/userController";
import { protectRoute } from "../middlewares/authMiddleware";


const router = express.Router();


router.get("/", protectRoute,  handleGetAllUsers)
router.get("/:id", protectRoute, handleGetUserDetails);
router.patch("/:id", protectRoute, handleUpdateUser);
router.post("/", handleCreateUser);
export default router;
