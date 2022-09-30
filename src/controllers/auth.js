import User from "../models/User.js"
import { encryptPassword } from "../utils/hash.js"
import { email as emailRegex} from "../utils/regex.js"

import jwt from "jsonwebtoken"

const Auth = {
    getLogin: (req, res) => {
        res.status(200).send("Pagina de login")
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user) return res.status(404).json({status: "ERROR", moment: new Date().toLocaleString(), message: "Usuario no encontrado"})

        const validation = await user.comparePassword(password)

        if(!validation) {
            return res.status(401).json({status: "ERROR", moment: new Date().toLocaleString(), message: "Contraseña incorrecta"})
        }

        const token = jwt.sign({ 
            id: user._id,  
            name: user.name,
            email: user.email
        }, process.env.TOKEN_SECRET, {expiresIn: "1h"})

        res.status(200).header("auth-token", token).json(token)
    },



    getRegister: (req, res) => {
        res.status(200).send("Pagina de register")
    },
    postRegister: async (req, res) => {
        const { name, email, password } = req.body

        if(!name || !email || !password) {
            return res.status(400).json({message: "Faltan campos rey"})
        }

        if(!email.match(emailRegex)) {
            return res.status(400).json({message: "Email invalido"})
        }

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = new User({ 
            name, 
            email, 
            password: await encryptPassword(password)
        })

        await user.save()
        res.status(201).json({ message: "User registered", user })
    }
}

export default Auth