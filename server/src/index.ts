import express from "express";
import { OAuth2Client } from "google-auth-library";
import cors from "cors";
import jwt from "jsonwebtoken";

import 'dotenv/config'

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


const MONGO_DB = process.env.MONGO_DB;
const PORT = parseInt(process.env.PORT!) || 3001;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(CLIENT_ID);

import connectMongoDb from "./connect";
import UserRoute from "./routes/userRoute";


app.use("/auth/user", UserRoute);


connectMongoDb(MONGO_DB);


// connectMongo();
app.listen(PORT, () => {
    console.log(`Node API app is running on port ${PORT}`);
});
