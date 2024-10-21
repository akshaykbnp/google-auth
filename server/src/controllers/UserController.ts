
import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/token";
import bcrypt from "bcrypt";
import { getHashSalt } from "../utils/environments";
 

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error("Error in / route:", err);
        res.status(500).json({ status: "error", message: "Failed to fetch users" });
    }
}

export const handleCreateUser = async (req: Request, res: Response) => {
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

        console.log(newUser);
        const user = await newUser.save()

        const token = generateToken(user);

       
        res.status(200).json({token});
    } catch (err) {
        console.error(err);    
        res.status(500).json({ error: 'Failed to create' + err })
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