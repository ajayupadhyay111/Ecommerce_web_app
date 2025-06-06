import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db connection successfull")
    } catch (error) {
        console.log("db connection error => ",error.message)
    }
}
export default connectDB;