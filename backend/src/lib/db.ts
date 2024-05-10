import mongoose from "mongoose"

export async function connectToMongo(){
    const URL = process.env.NODE_ENV_MONGODB_URI_CONNECTION;

    if(!URL) throw new Error("Error: MongoDB URI is invalid or doesnt exist")

    const connection = await mongoose.connect(URL);

    if(!connection) throw new Error("Error: Couldn't connect to database")

    console.log("Connected to database")
}
