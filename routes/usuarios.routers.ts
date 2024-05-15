import { Router } from "express";
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, postsUsuario } from '../controllers/usuarios.controllers'

const router = Router();

//Crear usuario
router.post('/crear-usuario',postUsuario);

//Devuelve informacion del usuario
router.post('/info',postsUsuario);

//Obtener usuarios
router.get('/usuarios',getUsuarios);

//Obtener usuario
router.get('/leer-usuario/:id',getUsuario);

//Actualizar 
router.put('/actualizar/:id',putUsuario);

//Eliminar
router.delete('/eliminar/:id',deleteUsuario);

export default router;
