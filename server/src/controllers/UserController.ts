import User, { IUserSchema } from "../models/UserModel"

export const handleGetAllUsers = async (): Promise<IUserSchema[]> => {
    try {
        const users = await User.find({});
        return users;
    } catch (err) {
        console.error("errer fetching all users", err);
        return []
    }
}
