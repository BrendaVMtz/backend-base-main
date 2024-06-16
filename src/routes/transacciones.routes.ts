import Router from "express";
import {
  getTransaction,
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transacciones.controller";
// import {
//   getAccounts,
//   getAccount
// } from "../controllers/cuentas.controller";
import { authRequired } from "../middlewares/validateToken";

const router = Router();
//////////Transacciones
//Get transactions
router.get("/", authRequired, getTransactions);
router.get("/:id", authRequired, getTransaction);

//Create 
router.post("/", authRequired, createTransaction);

//Update
router.put("/:id", authRequired, updateTransaction);

router.delete("/:id", authRequired, deleteTransaction);

// /////////Cuentas
// router.get("/cuentas/",authRequired, getAccounts);

// router.get("/cuentas/:id", authRequired, getAccount);


export default router;
