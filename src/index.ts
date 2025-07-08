import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import prisma from "./lib/prisma";
import errorHandler from "./middlewares/error-handler";
import { UserRepository } from "./repositories/userRepository";
import userRouter from "./routes/UserRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await prisma.$connect();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/users", userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
