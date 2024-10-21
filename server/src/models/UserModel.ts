import mongoose, { Document, Model } from "mongoose";

//User interface.
export interface IUserSchema extends Document {
    email: string;
    name: string;
    password: string;
}

const userSchema = new mongoose.Schema<IUserSchema>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password : { type: String, required: true },
});

const User: Model<IUserSchema> = mongoose.model<IUserSchema>('User', userSchema);
export default User;
