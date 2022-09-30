import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

export default mongoose.model("cart", cartSchema)

// carrito.products.reduce((actual, posterior) => {
//     return actual.price + posterior.price
// })
