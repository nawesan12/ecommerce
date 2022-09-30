import express from 'express'
import morgan from "morgan"
import fs from "fs"
import usersRoute from './routes/users.route.js'
import productsRoute from './routes/products.route.js'
import cartRoute from './routes/cart.route.js'
import authRoute from './routes/auth.route.js'
import searchRoute from './routes/search.route.js'

import config from "./config.js"
import { now } from "./utils/time.js"
import {mongooseConnection} from "./mongo.js"

import { verifyToken } from './middlewares/verifyToken.js'

const app = express()
mongooseConnection()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))

// Rutas
app.use("/users", usersRoute)
app.use("/products", productsRoute)
app.use("/cart", cartRoute)
app.use("/auth", authRoute)
app.use("/search", searchRoute)

app.get("/market", verifyToken, (req, res) => {
    console.log(req.user)
    res.status(200).send(`Hola ${req.user.name}! Bienvenido al market!`)
})

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
})

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT} in ${now}`)

    if(fs.existsSync("./src/logs/server.txt")) {
        fs.appendFileSync(
            "./src/logs/server.txt", 
            `- New startup on ${config.PORT} in ${now} \n`)
    } else {
        fs.mkdirSync("./src/logs")
        fs.writeFileSync(
            "./src/logs/server.txt", 
            `- New startup on ${config.PORT} in ${now} \n`)
    }
})