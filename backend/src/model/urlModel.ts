import mongoose from "mongoose"
import IUrl from "../interface/IUrl"

const urlSchema = new mongoose.Schema<IUrl>({
    redirectUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String, 
        required: true
    },
    clicks: {
        type: Number, default: 0
    }
}, {timestamps: true})

const Url = mongoose.model<IUrl>("Url", urlSchema)
export default Url