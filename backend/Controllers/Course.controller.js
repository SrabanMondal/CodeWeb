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
    const id = req.student._id.toString();
    if (!id) {
      return res.status(400).json(new ApiResponse(false, "Token is Required"));
    }
    const student = await Student.findById(id);
    if (!student) {
      return res.status(400).json(new ApiResponse(false, "Student Not Found"));
    }
    const data = [];
    for (let i = 0; i < student.courses_enrolled.length; i++) {
      const course = student.courses_enrolled[i];
      data.push(course);
    }
    res.status(200).json(new ApiResponse(true, data));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
export { CreateCourse, GetAllCourses };
