import express from "express";
import dotenv from "dotenv";
import MainRouter from "./Routes/main.routes.js";
import ConnectDb from "./Config/ConnectDb.js";
dotenv.config();
const app = express();
ConnectDb();
app.get("/", (req, res) => {
	res.send("<h1> Backend Server is Working</h1>");
});
app.use("/api/v1/main", MainRouter);
export default app;


