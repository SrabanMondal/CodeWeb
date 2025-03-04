import express from "express";
import dotenv from "dotenv";
import StudentRouter from "./Routes/Student.routes.js";
import CourseRouter from "./Routes/Course.routes.js";
import ConnectDb from "./Config/ConnectDb.js";
dotenv.config();
const app = express();
ConnectDb();
app.get("/", (_, res) => {
	res.send("<h1> Backend Server is Working</h1>");
});
app.use("/api/v1/main", StudentRouter);
app.use("/api/v1/course", CourseRouter);
export default app;
