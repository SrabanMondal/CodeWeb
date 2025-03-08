import express from "express";
import { Register, Login, GetStudentData } from "../Controllers/Student.controller.js";
import is_authenticated from "../Middleware/isauthenticated.js";
const StudentRouter = express.Router();

StudentRouter.post("/register", Register);
StudentRouter.post("/login", Login);
StudentRouter.get("/getdata",is_authenticated,GetStudentData);
export default StudentRouter;
