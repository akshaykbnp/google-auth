import mongoose, { Document, Model } from "mongoose";

//User interface.
export interface IUserSchema extends Document {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
}

const userSchema = new mongoose.Schema<IUserSchema>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String }
});

const User: Model<IUserSchema> = mongoose.model<IUserSchema>('User', userSchema);
export default User;

