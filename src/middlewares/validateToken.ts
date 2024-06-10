import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    // try {
        const { token } = req.cookies;
        //console.log(token);

        if (!token)
           return res
             .status(401)
             .json({ message: "No token, authorization denied" });

        jwt.verify(token, TOKEN_SECRET, (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
           if (err) 
            return res
             .status(403)
             .json([{ message: "Code 403: No autorizado" }]);
            
           //console.log(user);
           req.user = user;
           next();
        });
    // } catch (error: any) {
    //   return res.status(500).json({ message: error.message });
    // }
  };
