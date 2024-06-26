import mongoose from "mongoose";


const connectToDBusingMongoose = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("connected to DB");
        
    } catch (err) {
        console.error("error while connecting to DB " + err);
    }
}

export default connectToDBusingMongoose;