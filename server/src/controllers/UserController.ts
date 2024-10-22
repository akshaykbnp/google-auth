
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { getHashSalt, getJWTSecretKey } from "../utils/environments";
import { v4 as uuidv4 } from 'uuid'; // For generating random UUID
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/jwtPayload";

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error("Error in / route:", err);
        res.status(500).json({ status: "error", message: "Failed to fetch users" });
    }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        const updateData = req.body;

        if (!user) throw new Error("User not found");

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { $set: updateData }, // Only updates fields sent in the request body
            { new: true, runValidators: true } // Return the updated document
        );

        console.log(updatedUser);
        res.status(200).json(updatedUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' + err })
    }
}


export const handleGetUserDetails = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);

        if (!user) res.status(404).json({ error: 'User not found' })
        else res.status(200).json(user);

        console.log(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get user' + err })
    }
}


export const handleDeleteUser = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id;

        const deletedUser = User.findByIdAndDelete(_id);

        console.log(deletedUser);


        if (!deletedUser) res.status(404).json({ error: 'User not found' })
        else res.status(200).json({ message: 'User successfully deleted', user: deletedUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' + err })
    }
}


export const handleCreateGuestUser = async (req : Request, res : Response) => {
    try {
        
        const guestName = `Guest_${Math.random().toString(36).substring(2, 8)}`;
        const guestUser = {
            name : guestName, 
            email : `${guestName}@guest.com`, 
            password :  `${uuidv4().substring(0, 8)}#${Math.floor((Math.random() * 20) + 1).toString()}` 
        }  

        console.log("guest user", guestUser)
        //hash password
        const saltRounds = parseInt(getHashSalt()!) || 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(guestUser.password, salt);


        const newUser = new User({
            name: guestUser.name,
            email: guestUser.email,
            password: hash,
        });

        const user = await newUser.save()

        const secretKey = getJWTSecretKey();

        if (!secretKey) throw new Error("secret key not found");

        // Prepare the JWT payload
        const payload: JwtPayload = { userId: (user._id as Schema.Types.ObjectId).toString(), email: user.email , name : user.name};

        const token = jwt.sign(payload, secretKey, { expiresIn: '30d' });

        res.status(200).json({token});

    } catch (err) {
        console.error(err);    
        res.status(500).json({ error: 'Failed to create' + err })
    }
}