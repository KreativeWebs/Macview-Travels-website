import mongoose from 'mongoose';

export async function connectToDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Db connected", conn.connection.host);
    } catch (error) {
        console.log("Error connecting", error.message);
        process.exit(1);
    }
}