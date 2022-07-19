import { Router } from "express";
import login from "../controllers/auth";

const router = Router();

// TODO: Validar campos
router.post('/login', login)



export default router;
