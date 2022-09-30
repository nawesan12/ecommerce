import { Router } from "express"
import controller from "../controllers/auth.js"

const router = Router()

router
    .get("/login", controller.getLogin)
    .post("/login", controller.postLogin) 

    .get("/register", controller.getRegister)
    .post("/register", controller.postRegister)

export default router