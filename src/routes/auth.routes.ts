import {Router} from 'express';
import {
  loginHandler,
  profileHandler,
  signupHandler,
  logoutHandler
} from "../controllers/auth.controller";
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema, registerSchema } from "../schemas/user.schema";

const router = Router();

router.post("/register", validateSchema(registerSchema), signupHandler);

router.post('/login', validateSchema(loginSchema), loginHandler);

router.post('/logout', logoutHandler);

router.get("/profile", authRequired, profileHandler);

export default router;
