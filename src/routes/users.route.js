import { Router } from "express"
import controller from "../controllers/users.js"

const router = Router()

router
    .get("/", controller.getAllUsers)
    .post("/", controller.createUser)
    
    .get("/:id", controller.getUserById)
    .put("/:id", controller.updateUser)
    .patch("/:id", controller.patchUser)
    .delete("/:id", controller.deleteUser)


export default router