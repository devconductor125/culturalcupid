import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validateSeniorAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({ error: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: "Failed to authenticate token." });
    }

    if (decoded.isAdmin === true && decoded.adminType === "senior") {
      next();
    } else {
      return res
        .status(403)
        .send({ error: "You are not authorized to access this resource." });
    }
  });
};
