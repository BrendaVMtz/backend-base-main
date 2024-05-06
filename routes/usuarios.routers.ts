import { Router } from "express";
import { getUsuarios, postUsuarios, putUsuario, deleteUsuario} from '../controllers/usuarios.controllers'

const router = Router();

router.get('/get-usuarios',getUsuarios);
router.post('/',postUsuarios);
router.put('/',putUsuario);
router.delete('/',deleteUsuario);

export default router;