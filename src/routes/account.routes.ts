import Router from "express";
import {
  getAccounts,
  getAccount
} from "../controllers/cuentas.controller";
import { authRequired } from "../middlewares/validateToken";

const router = Router();

router.get("/",authRequired, getAccounts);

router.get("/:id", authRequired, getAccount);


export default router;
