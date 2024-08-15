import mongoose from "mongoose"
const dbConnect = async () => {
    try {
       await mongoose.connect("mongodb://localhost:27017/url-shortener")
       console.log("monogoDB connected")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect