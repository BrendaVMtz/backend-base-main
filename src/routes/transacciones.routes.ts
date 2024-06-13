import Router from "express";
import {
  getTransaction,
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transacciones.controller";
import {
  getAccounts
} from "../controllers/cuentas.controller";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get("/", requireAuth, getTransactions);

router.post("/transactions", requireAuth, createTransaction);

router.get("/transactions/:id", requireAuth, getTransaction);

router.put("/transactions/:id", requireAuth, updateTransaction);

router.delete("/transactions/:id", requireAuth, deleteTransaction);

router.get("/cuentas", getAccounts);

//router.get("/cuenta/:id", requireAuth, getTransaction);


export default router;
