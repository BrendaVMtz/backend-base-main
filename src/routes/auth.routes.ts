import {Router} from 'express';
import {
  loginHandler,
  profileHandler,
  signupHandler,
  logoutHandler
} from "../controllers/auth.controller";
import { authRequired } from "../middlewares/validateToken";
//import { validateSchema } from "../middlewares/validateSchema";
//import { loginSchema, signupSchema } from "../schemas/user.schema";

const router = Router();

router.post("/register", /*validateSchema(signupSchema),*/ signupHandler);

router.post('/login', loginHandler);

router.post('/logout', logoutHandler);

router.get("/profile", authRequired, profileHandler);

export default router;
