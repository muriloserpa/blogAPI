import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import errorHandler from "./middlewares/error-handler";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
