import { Router } from "express";
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario} from '../controllers/usuarios.controllers'

const router = Router();

//Crear usuario
router.post('/',postUsuario);

//Obtener usuarios
router.get('/',getUsuarios);

//Obtener usuario
router.get('/:id',getUsuario);

//Actualizar 
router.put('/:id',putUsuario);

//Eliminar
router.delete('/:id',deleteUsuario);

export default router;