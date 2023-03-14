import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import AuthRouter from "./routes/AuthRouter.js";
import dummy from "./data/dummy.js";
import { errorHandler, notFound } from "./Middleware/errorMiddleware.js";
import connectDB from "./Config/db.js";

const app = express();
// dotenv.config(({ path: path.resolve( '../.env') }));
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB();
app.get("/", function (req, res) {
  res.json({
    name: "Vaishnav",
  });
});
app.get("/api/test", (req, res) => {
  res.json(dummy);
});
app.use("/auth/user", AuthRouter);

app.use(notFound);
app.use(errorHandler);

// DB CONNECTION
const PORT = process.env.PORT || 8000;



    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
