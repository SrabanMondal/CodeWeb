import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import Course from "../Models/Course.js";
import Student from "../Models/Student.js";

const CreateCourse = async (req, res) => {
  try {
    const { title, courseid } = req.body;
    if (!title || !courseid) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Title and Course Id is required"));
    }
    const previouscourse = await Course.findOne({ title: title });
    if (previouscourse) {
      return res
        .status(200)
        .json(new ApiResponse(false, "Course Already Created"));
    }
    const NewCourse = await Course.create({ title: title, courseid: courseid });
    res.status(201).json(new ApiResponse(true, "Course Created Successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.messagee));
  }
};
const GetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    const data = [];
    console.log(courses);
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      data.push(course);
    }
    res.status(200).json(new ApiResponse(true, data));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const AddCourseStudent = async(req,res) => {
try {
    const {studentemail,coursetitle} = req.body;
    if(!studentemail || !coursetitle){
	return res.status(400).json(new ApiResponse(false, "Student Email and Course Title is required"));
	}
   const student = await Student.findOne({email:studentemail});
   if(!student){
	return res.status(404).json(new ApiResponse(false,"Student Not Found"));
	}
   const course = await Course.findOne({courseid:coursetitle});
   if(!course){
	return res.status(404).json(new ApiResponse(false,"Course Not Found"));
	}
   const id = course._id.toString();
   if(student.courses_enrolled.includes(id)){
	return res.status(400).json(new ApiResponse(false,"Course Already Enrolled"));
	}
   student.courses_enrolled.push(id);
   await student.save();
   res.status(200).json(new ApiResponse(true,"Course Added Successfully"));
} catch (error) {
   res.status(500).json(new ApiError(false, error.message));	
}
}
export { CreateCourse, GetAllCourses, AddCourseStudent};
