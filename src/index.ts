import express from "express";
import dotenv from "dotenv";
import prisma from "./lib/prisma";
import errorHandler from "./middlewares/error-handler";
import userRouter from "./routes/UserRoutes";
import postRouter from "./routes/PostRoutes";
import authRouter from "./routes/AuthRoutes";
import { authenticate, authorizeAdmin } from "./middlewares/auth";

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

app.use("/users", authenticate, authorizeAdmin, userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
