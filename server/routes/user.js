import { Router } from "express";
import userPost from "../controllers/users.js";

const userRouter = Router();

userRouter.post("/register", userPost)

export default userRouter;
