import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload extends jwt.JwtPayload {
  id: number;
  email: string;
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Token não encontrado" });
    return;
  }

  const token = req.headers.authorization.split(" ")[2];
  const decoded = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as TokenPayload;

  if (!decoded || !decoded.id || !decoded.email) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }

  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    res.status(401).json({ error: "Token expirado" });
    return;
  }

  req.user = {
    id: decoded.id,
    email: decoded.email,
  };

  next();
}

export default authMiddleware;
