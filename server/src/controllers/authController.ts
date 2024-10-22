import { Request, Response } from "express";
import User from "../models/userModel";
import { getHashSalt, getJWTSecretKey } from "../utils/environments";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Schema } from 'mongoose';
import { JwtPayload } from "../interfaces/jwtPayload";


export const handleRegisterUser = async (req: Request, res: Response) => {

    try {
        const { fullName, email, password, cpassword } = req.body;

        //hash password
        const saltRounds = parseInt(getHashSalt()!) || 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name: fullName,
            email: email,
            password: hash,
        });

        const user = await newUser.save();        

        const secretKey = getJWTSecretKey();

        if (!secretKey) throw new Error("secret key not found");

        // Prepare the JWT payload
        const payload: JwtPayload = { userId: (user._id as Schema.Types.ObjectId).toString(), email: user.email, name : user.name };

        const token = jwt.sign(payload, secretKey, { expiresIn: '30d' });

        res.status(200).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create' + err })
    }

}


export const handleLoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).json({ error: "user not found" })
            throw new Error("User not found");
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' })
            throw new Error("wrong password");
        }

        const secretKey = getJWTSecretKey();

        if (!secretKey) throw new Error("secret key not found");

        // Prepare the JWT payload
        const payload: JwtPayload = { userId: (user._id as Schema.Types.ObjectId).toString(), email: user.email , name : user.name};

        const token = jwt.sign(payload, secretKey, { expiresIn: '30d' });
        res.status(200).json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login user' + err })
    }
}