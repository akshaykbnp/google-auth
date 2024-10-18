import mongoose from "mongoose";

const connectMongoDb =  (MONGO_DB : string | undefined) => {

    if (!MONGO_DB) {
        console.log("cannot get mongo url");
        return;
    }

    mongoose
        .connect(MONGO_DB)
        .then(() => {
            console.log("connected to MongoDB");

        })
        .catch((error) => {
            console.log(error);
        });
}

export default connectMongoDb;

