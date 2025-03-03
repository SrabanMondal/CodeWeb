import express from "express";
import { Register, Login } from "../Controllers/main.controller.js";
const MainRouter = express.Router();

MainRouter.post("/register", Register);
MainRouter.post("/login", Login);
export default MainRouter;
