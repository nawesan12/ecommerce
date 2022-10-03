import app from "./app.js"
import http from "http"
import { Server as WebSocketServer } from "socket.io"

import config from "./config.js"
import { now } from "./utils/time.js"
import Sockets from "./sockets.js"

const httpServer = http.createServer(app)

const server = httpServer.listen(config.PORT, () => {
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

const io = new WebSocketServer(server)

Sockets(io)