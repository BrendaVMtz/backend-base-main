import Router from "express";
import {
  getTransaction,
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transacciones.controller";
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { createTransactionSchema } from "../schemas/transaction.schema";


const router = Router();
//////////Transacciones
//Get transactions
router.get("/", authRequired, getTransactions);
router.get("/:id", authRequired, getTransaction);

//Create 
router.post("/", authRequired,validateSchema(createTransactionSchema) ,createTransaction);

//Update
router.put("/:id", authRequired,validateSchema(createTransactionSchema) , updateTransaction);

router.delete("/:id", authRequired, deleteTransaction);

// /////////Cuentas
// router.get("/cuentas/",authRequired, getAccounts);

// router.get("/cuentas/:id", authRequired, getAccount);


export default router;
