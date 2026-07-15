import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.session;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      console.error("SESSION_SECRET environment variable is not configured");
      return res.status(500).json({ error: "Internal server configuration error" });
    }

    const decoded = jwt.verify(token, secret) as { username: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session. Please log in again." });
  }
}
