import { IUserSchema } from "../models/userModel";
import jwt from "jsonwebtoken";
import { getJWTSecretKey } from "./environments";

export const generateToken = (user: IUserSchema)  : string | null => {

    const {email, name, password, _id} = user;

    const data = {name, email, password, _id};

    const secretKey = getJWTSecretKey();

    if (!secretKey) return null;

    const token = jwt.sign(data, secretKey, {
        expiresIn: '30d',
    });

    return token;
}
