import jwt from "jsonwebtoken"
import ApiResponse from "../Utils/ApiResponse.js"
import ApiError from "../Utils/ApiError.js"
import Student from "../Models/Student.js"
const is_authenticated = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').split(' ')[0];
        if(!token){
            return res.status(401).json(new ApiResponse(false,"Please Login First"));
        }	
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json(new ApiResponse(false,"Student not Found"));
        }
	const id = decoded.data.data;
        const student = await Student.findById(id);
        req.student = student;
        next(); 
    } catch (error) {
        res.status(500).json(new ApiError(false,error.message));
    }
}
export default is_authenticated;

