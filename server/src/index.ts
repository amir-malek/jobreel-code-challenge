import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { database, connectDb } from "./config/database";
import routesSetup from "./routes";
import { globalErrorHandler } from "./middleware";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Resume Builder API is running");
});

app.get("/database-test", async (req: Request, res: Response) => {
  try {
    const ping = await database.admin().ping();
    res.send(ping);
  } catch (error) {
    console.log(error);
    res.send("Database connection failed");
  }
});

app.use(cors());

connectDb();

routesSetup(app);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
