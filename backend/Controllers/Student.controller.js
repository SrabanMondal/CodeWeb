import ApiResponse from "../Utils/ApiResponse.js";
import ApiError from "../Utils/ApiError.js";
import Student from "../Models/Student.js";
import bcrypt from "bcrypt";
import GenerateToken from "../Utils/Token.js";
const Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Email and Password is required"));
    }
    const student = await Student.findOne({
      Email: email,
    });
    if (student) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Student already exists"));
    }
    const hasedpassword = await bcrypt.hash(password, 10);
    const newstudent = await Student.create({
      Email: email,
      Password: hasedpassword,
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
    const student = await Student.findOne({ Email: email });
    if (!student) {
      return res.status(404).json(new ApiResponse(false, "Student not Found"));
    }
    const ismatched = bcrypt.compare(password, student.Password);
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

export { Register, Login };
