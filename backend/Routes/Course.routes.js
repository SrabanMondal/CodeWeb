import express from "express";
import { AddCourseStudent, AddMcq, CreateCourse, GetAllCourses, GetMcqSection, GetSection,AddSection } from "../Controllers/Course.controller.js";
import is_authenticated from "../Middleware/isauthenticated.js";
const CourseRouter = express.Router();

CourseRouter.get("/getall",GetAllCourses);
CourseRouter.post("/create",CreateCourse);
CourseRouter.post("/add",AddCourseStudent);
CourseRouter.post("/addmcq",AddMcq);
CourseRouter.post("/addsection",AddSection);
CourseRouter.post("/getmcq",GetMcqSection);
CourseRouter.post("/getsection",GetSection);
export default CourseRouter;
