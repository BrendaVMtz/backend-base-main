import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Sin cabecera" });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" }); //token vacio

  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).json([{ message: "Code 403: No autorizado" }]);

    //console.log(user)
    req.user = user;

    next();
  });
};
