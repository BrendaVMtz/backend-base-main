import { Router } from "express";
import { login, profile } from '../controllers/auth.controller'

const authRouter = Router();

//Crear usuario
authRouter.post('/api/login',login);

//Obtener usuarios
authRouter.get('/api',profile);

export default authRouter;
