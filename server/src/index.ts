import express from "express";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from './model/model'


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


const MONGO_DB = process.env.MONGO_DB;
const PORT = process.env.PORT;


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;

const client = new OAuth2Client(CLIENT_ID);

app.post("/api/google-login", async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the token using Google API
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;

        // Check if the user exists in the MongoDB database
        let user = await User.findOne({ googleId: sub });

        if (!user) {
            // Create a new user record if not exist
            user = new User({
                googleId: sub,
                email,
                name,
                picture
            });
            await user.save();
        }

        // Generate a session token for the authenticated user
        const sessionToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send the session token to the client
        res.json({ success: true, sessionToken });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});


app.get("/", function (req, res) {
    res.send("Hello C# Corner.");
});


const connectMongo = () => {

    if (!MONGO_DB) {
        console.log("cannot get mongo url");
        return;
    }

    mongoose
        .connect(MONGO_DB)
        .then(() => {
            console.log("connected to MongoDB");
            app.listen(PORT, () => {
                console.log(`Node API app is running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.log(error);
        });

}



connectMongo();
