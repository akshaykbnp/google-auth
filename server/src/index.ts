import express from "express";
const app = express();
import mongoose from "mongoose";

const MONGO_DB = process.env.MONGO_DB;
const PORT = process.env.PORT;



app.get("/", function (req, res) {
    res.send("Hello C# Corner.");
});


const connectMongo = () => {

    if(!MONGO_DB) {
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
