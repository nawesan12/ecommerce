import { Router } from "express"
import controller from "../controllers/products.js"

const router = Router()

router 
    .get("/", controller.getAllProducts)
    .post("/", controller.createProduct)

    .get("/:id", controller.getProductById)
    .put("/:id", controller.updateProduct)
    .patch("/:id", controller.patchProduct)
    .delete("/:id", controller.deleteProduct)

export default router