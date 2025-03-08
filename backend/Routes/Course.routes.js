import express from "express";
import { CreateCourse, GetAllCourses } from "../Controllers/Course.controller.js";
import is_authenticated from "../Middleware/isauthenticated.js";
const CourseRouter = express.Router();

CourseRouter.post("/create",CreateCourse);
CourseRouter.get("/getall",is_authenticated,GetAllCourses);
export default CourseRouter;
