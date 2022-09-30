import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    stock: {
        type: Number
    }
}, { versionKey: false, timestamps: true })

export default mongoose.model("product", productSchema)