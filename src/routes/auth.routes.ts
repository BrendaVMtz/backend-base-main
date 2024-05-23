import { Router } from "express";
import { loginController,  profileController } from '../controllers/auth.controller'
import { auth } from "../middlewares/auth";

const authRouter = Router();

//Crear usuario
authRouter.post('/login', loginController);

//Obtener usuarios
authRouter.get('/profile', auth, profileController);

export default authRouter;
