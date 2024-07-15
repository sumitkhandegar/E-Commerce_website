import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongodb Database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Eroor in Mongoose ${error}`)
    }
};

export default connectDB; 