import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false, 
    timestamps: true
})

userSchema.methods.comparePassword = async function (password) {
    const validation = await bcrypt.compare(password, this.password)
    return validation
}

const User = mongoose.model("user", userSchema)

export default User