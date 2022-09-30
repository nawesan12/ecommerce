import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token) return res.status(401).json({status: "ERROR", moment: new Date().toLocaleString(), message: "Acceso denegado"})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json(error)
    }
}