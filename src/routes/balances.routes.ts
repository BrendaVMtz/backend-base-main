import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import { createBalance } from "../controllers/balances.controller";


const router = Router();
//Create
router.post('/crear-balance',authRequired,createBalance);
//Read

// router.get('/',authRequired,getBalances);
// router.get('/leer-balance/:id',);
// //Update
// router.put('/modificar-balance/:id',);
// //Delete
// router.delete('/borrar-balance/:id', );

export default router;