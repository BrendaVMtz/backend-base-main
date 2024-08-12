import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import {
  createBalance,
  deleteBalance,
  getBalance,
  getBalances,
  getTransactionsByBalance,
} from "../controllers/balances.controller";

const router = Router();
//Create
router.post("/crear-balance", authRequired, createBalance);
//Read
router.get("/leer-balances", authRequired, getBalances);

router.get("/leer-balance/:id", authRequired, getBalance);

router.get(
  "/leer-transactionsByBalance/:id",
  authRequired,
  getTransactionsByBalance
);

// //Update
// router.put('/modificar-balance/:id',);
// //Delete
router.delete("/borrar-balance/:id", authRequired, deleteBalance);

export default router;
