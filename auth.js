import jwt from "jsonwebtoken";
// import pkg from "dotenv";
// const { JWT_SECRET } = pkg;

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    response.userId = decoded.userId;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Token invalido" });
  }
}
