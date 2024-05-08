import { Router } from "express";
import { 
    createUsuario,
    getUsuarios, 
    postUsuarios, 
    putUsuario, 
    deleteUsuario} from '../controllers/usuarios.controllers'

const router = Router();

router.post('/crear-usuario',createUsuario);
router.get('/',getUsuarios);
router.post('/',postUsuarios);
router.put('/',putUsuario);
router.delete('/',deleteUsuario);

export default router;