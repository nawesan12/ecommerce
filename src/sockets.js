import fs from "fs"

/**
*       Socket System
*       Este sistema de sockets es el responsable de la comunicacion entre el servidor y el cliente.
*       Dandole al cliente del comercio la posibilidad de comunicarse con el vendedor.
*       
*       Eventos:
*       - connection: Se ejecuta cuando un cliente se conecta al servidor   
*       - disconnect: Se ejecuta cuando un cliente se desconecta del servidor
*       - client:message: Se ejecuta cuando un cliente envia un mensaje al servidor
*       @param {object} io
*       El objeto sale de WebSocketServer
*       
*       @returns {void}
*       No devuelve nada
*/
const Sockets = (io) => {
    // IO es el servidor, el cual le habla a todos
    // Socket es el cliente, el cual le habla a uno

    io.on("connection", (socket) => {
        console.log(`New connection from ${socket.id} at ${new Date().toLocaleString()}`)

        socket.on("client:message", (data) => {
            const { message, user, key } = data

            if(!fs.existsSync("/chats")) {
                fs.mkdir("chats", (err) => {
                    if(err) throw err
                })    
            }

            fs.appendFile(`chats/${user.name}`, `${message} \n`, (err) => {
                if(err) throw err
            })

            io.to(key).emit("client:message", data)
        })

        socket.on("client:typing", (data) => {
            const { user, key } = data

            io.to(key).broadcast.emit("client:typing", user)
        })

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected`)
        })
    })
}

export default Sockets