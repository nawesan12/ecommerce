import { Router } from "express"

const router = Router()

router
    .get("/:query", (req, res) => {
        const query = req.params.query
    })

export default router