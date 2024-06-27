import mongoose from "mongoose";

export async function connectToMongo() {
  const connection = await mongoose.connect(
    "mongodb+srv://gabrielcosta:asdfg123456@cluster0.9onb1r7.mongodb.net/"
  );

  if (!connection) throw new Error("Error: Couldn't connect to database");

  console.log("Connected to database");
}
