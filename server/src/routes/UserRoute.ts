import express, {Request, Response} from "express";
import { handleGetAllUsers } from "../controllers/UserController";

const router = express.Router();


router.get("/", async (req : Request, res : Response) => {
    try{
        const users = await handleGetAllUsers();
        res.status(200).json(users);
    }catch(err){
        console.error("Error in / route:", err);
        res.status(500).json({ status: "error", message: "Failed to fetch users" });
    }

})

router.get("/:id", async (req, res) => {
    
});

export default router;
