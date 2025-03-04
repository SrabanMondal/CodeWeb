import express from "express";
import { Register, Login } from "../Controllers/Student.controller.js";
const StudentRouter = express.Router();

StudentRouter.post("/register", Register);
StudentRouter.post("/login", Login);
export default StudentRouter;
