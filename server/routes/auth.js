import { Router } from "express";
import login from "../controllers/auth.js";
import { check } from 'express-validator';
import validateFields from "../middlewares/validate-fields.js";

const authRouter = Router();

authRouter.post('/',[
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('email', 'No es un email valido').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
], login);


export default authRouter;

