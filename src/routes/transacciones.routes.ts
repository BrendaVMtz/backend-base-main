import Router from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction
} from "../controllers/transacciones.controller";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

///CREATE
router.post('/crear-transaccion',authRequired,createTransaction);
///READ
router.get('/leer-transaccion/:id',authRequired,getTransaction);
// router.get('/calcular-balance');

// ////UPDATE
router.put('/actualizar-transaccion/:id',authRequired,updateTransaction);
// ////BORRAR
router.delete('/borrar-transaccion/:id',authRequired,deleteTransaction);


export default router;
