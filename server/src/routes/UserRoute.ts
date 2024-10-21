import express, {Request, Response} from "express";
import { handleGetAllUsers, handleGetUserDetails, handleUpdateUser, handleCreateUser, handleCreateGuestUser } from "../controllers/userController";
import { protectRoute } from "../middlewares/authMiddleware";


const router = express.Router();


router.get("/", protectRoute,  handleGetAllUsers)
router.get("/:id", protectRoute, handleGetUserDetails);
router.patch("/:id", protectRoute, handleUpdateUser);
router.post("/", handleCreateUser);
router.post("/guest", handleCreateGuestUser);

export default router;
