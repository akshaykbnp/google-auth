import express from "express";
import cors from "cors";
import 'dotenv/config'

import connectMongoDb from "./connect";
import UserRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";


const app = express();
app.use(express.json());
app.use(cors());

const MONGO_DB = process.env.MONGO_DB;
const PORT = parseInt(process.env.PORT!) || 3001;

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/auth", authRoute);

connectMongoDb(MONGO_DB);


// connectMongo();
app.listen(PORT, () => {
    console.log(`Node API app is running on port ${PORT}`);
});
