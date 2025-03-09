import express from "express";
import { AddCourseStudent, CreateCourse, GetAllCourses } from "../Controllers/Course.controller.js";
import is_authenticated from "../Middleware/isauthenticated.js";
const CourseRouter = express.Router();

CourseRouter.get("/getall",GetAllCourses);
CourseRouter.post("/create",CreateCourse);
CourseRouter.post("/add",AddCourseStudent);
export default CourseRouter;
