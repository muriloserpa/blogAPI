import express from "express";
import dotenv from 'dotenv';
import type { Request, Response } from "express";


dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
