import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import Student from "../Models/Student.js";
import bcrypt from "bcrypt";
import GenerateToken from "../Utils/Token.js";

const Register = async (req, res) => {
  try {
    const { email, password , name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Email,Password and Name is required"));
    }
    const student = await Student.findOne({
      email: email,
    });
    if (student) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Student already exists"));
    }
    const hasedpassword = await bcrypt.hash(password, 10);
    const newstudent = await Student.create({
      name : name,
      email: email,
      password: hasedpassword,
      courses_completed: 0,
      average_grade: 0,
      correct_percentage: 0,
    });
    res.status(201).json(new ApiResponse(true, "Student created successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Email and Password is Required"));
    }
    const student = await Student.findOne({ email: email });
    if (!student) {
      return res.status(404).json(new ApiResponse(false, "Student not Found"));
    }
    const ismatched = bcrypt.compare(password, student.password);
    if (!ismatched) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Password is Incorrect"));
    }
    const token = GenerateToken({ data: student._id });
    res.status(200).json(new ApiResponse(true, token));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};

const GetStudentData = async (req, res) => {
  try {
    const id = req.student._id.toString();
    if (!id) {
      return res.status(404).json(new ApiResponse(false, "Student not Found"));
    }
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json(new ApiResponse(false, "Student Not Found"));
    }
    const data = {
      name : student.name,
      courses_enrolled : student.courses_enrolled,
      courses_completed: student.courses_completed,
      correct_percentage: student.correct_percentage,
      average_grade: student.average_grade,
    };
    res.status(200).json(new ApiResponse(true, data));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};

export { Register, Login, GetStudentData };
