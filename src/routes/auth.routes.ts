import {Router} from 'express';
import {
  loginHandler,
  // profileHandler,
  // signupHandler,
} from "../controllers/auth.controller";
// import { requireAuth } from "../middlewares/requireAuth";
// import { validateSchema } from "../middlewares/validateSchema";
// import { loginSchema, signupSchema } from "../schemas/user.schema";

const router = Router();

// router.post("/register", validateSchema(signupSchema), signupHandler);

router.post('/login', loginHandler);

// router.get("/profile", requireAuth, profileHandler);

export default router;
