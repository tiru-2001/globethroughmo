import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import connectToDb from "./config/connect";
import authrouter from "./routes/auth.route";
import cors from "cors";
const app: Express = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 8600;
connectToDb();
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hi I am on for globethrough",
    success: true,
  });
});
app.use("/api/v1/auth", authrouter);
app.listen(port, () => {
  console.log(`Iam listening on port ${port}`);
});
