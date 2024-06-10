import { Router } from "express";
import { 
    createUsuario,
    getUsuarios, 
    getUsuario,
    modificarUsuario,
    borrarUsuario
} from '../controllers/usuarios.controllers'

const router = Router();
//Create
router.post('/crear-usuario',createUsuario);
//Read
router.get('/',getUsuarios);
router.get('/leer-usuario/:id',getUsuario);
//Update
router.put('/modificar-usuario/:id',modificarUsuario);
//Delete
router.delete('/borrar-usuario/:id', borrarUsuario);

export default router;