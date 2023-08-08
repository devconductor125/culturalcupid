import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const comparePasswords = (password, hash) => {
  return bycrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bycrypt.hash(password, 5);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
