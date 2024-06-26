import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authRequired = (req: Request, res: Response, next: NextFunction) => {
    // try {
    // console.log(req.headers.authorization);
        const  token: any  = req.headers.authorization?.split('Bearer ');
        const authChain = token[1];
        console.log("ola");
        
        
        if (!authChain)
          return res
        .status(401)
        .json({ message: "No token, authorization denied" });
        
        // console.log(authChain);
        jwt.verify(authChain, TOKEN_SECRET, (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
           if (err) {
            // console.log(res);
             return res
             .status(403)
             .json([{ message: "Code 403: No autorizado" }]);
             
            }
           //console.log(user);
           req.user = user;
           next();
        });
    // } catch (error: any) {
    //   return res.status(500).json({ message: error.message });
    // }
  };
