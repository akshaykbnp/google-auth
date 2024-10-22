import { Request, Response, NextFunction } from "express"
import { getJWTSecretKey } from "../utils/environments";
import jwt from "jsonwebtoken";


export const verifyRoute = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = (req as any).token;

        const secretKey = getJWTSecretKey();


        if (!secretKey) throw new Error("secret key not found");

        const decoded = jwt.verify(token, secretKey);

        (req as any).user = decoded;

        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        res.status(401).json({ error: "Unauthorized access, invalid token" });

    }

}

//Check to make sure header is not undefined, if so, return Forbidden (403)
export const checkToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    // Ensure token is provided in the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "No token provided or invalid format" });
        throw new Error("No token provided or invalid format")
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    (req as any).token = token;
    next();

}
