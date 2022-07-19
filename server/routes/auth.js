import { Router } from "express";
import login from "../controllers/auth.js";

const authRouter = Router();

// TODO: Validar campos
authRouter.post('/', login)


export default authRouter;

