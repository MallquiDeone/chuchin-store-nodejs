import { Router } from "express";

const router = Router();

router.get("",(req, res)=>{
    res.send("BACKEND HECHO POR MALLQUI")
})

export default router;