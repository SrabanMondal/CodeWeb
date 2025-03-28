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
    const final_data = [];
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const data = {
        courseid: course.courseid,
        title: course.title,
      };
      final_data.push(data);
    }
    res.status(200).json(new ApiResponse(true, final_data));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const GetCourse = async (req, res) => {
  try {
    const { courseid } = req.body;
    if (!courseid)
      return res
        .status(400)
        .json(new ApiResponse(false, "CourseId is required"));
    const course = await Course.findOne({ courseid: courseid });
    if (!course)
      return res.status(404).json(new ApiResponse(false, "Course Not Found"));
    res.status(200).json(new ApiResponse(true, course));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const AddCourseStudent = async (req, res) => {
  try {
    const { studentemail, courseid } = req.body;
    if (!studentemail || !courseid) {
      return res
        .status(400)
        .json(
          new ApiResponse(false, "Student Email and Course Title is required"),
        );
    }
    const student = await Student.findOne({ email: studentemail });
    if (!student) {
      return res.status(404).json(new ApiResponse(false, "Student Not Found"));
    }
    const course = await Course.findOne({ courseid: courseid });
    if (!course) {
      return res.status(404).json(new ApiResponse(false, "Course Not Found"));
    }
    const id = course._id.toString();
    if (student.courses_enrolled.includes(id)) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Course Already Enrolled"));
    }
    student.courses_enrolled.push(id);
    await student.save();
    res.status(200).json(new ApiResponse(true, "Course Added Successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const AddSection = async (req, res) => {
  try {
    console.log(coursiid,sectiontitle,questions);
    const { courseid, sectiontitle, questions} = req.body;
    if (!courseid || !sectiontitle || !questions) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "CourseId,Section Title, Questions and TestCases are Required",
          ),
        );
    }
    const course = await Course.findOne({ courseid: courseid });
    if (!course) {
      return res.status(404).json(new ApiResponse(false, "Course Not Found"));
    }
    const section = {
      title: sectiontitle,
      questions: questions
    };
    course.section.push(section);
    await course.save();
    res
      .status(200)
      .json(new ApiResponse(true, "Section is Added Successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const AddMcq = async (req, res) => {
  try {
    const { title, description, options, courseid } = req.body;
    if (!title || !description || !options || !courseid) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Title,Description Options and CourseId are required",
          ),
        );
    }
    const course = await Course.findOne({ courseid: courseid });
    if (!course) {
      return res.status(400).json(new ApiResponse(false, "Course Not Found"));
    }
    const data = { title: title, description: description, options: options };
    course.mcqsection.push(data);
    await course.save();
    return res
      .status(200)
      .json(new ApiResponse(true, "Mcq Added Successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const GetMcqSection = async (req, res) => {
  try {
    const { courseid } = req.body;
    if (!courseid) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Course Id is required"));
    }
    const course = await Course.findOne({ courseid: courseid });
    if (!course) {
      return res.status(404).json(new ApiResponse(false, "Course Not Found"));
    }
    const final_data = [];
    for (let i = 0; i < course.mcqsection.length; i++) {
      const data = course.mcqsection[i];
      data.push(final_data);
    }
    res.status(200).json(new ApiResponse(true, final_data));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
const GetSection = async (req, res) => {
  try {
    const { courseid } = req.body;
    if (!courseid) {
      return res
        .status(400)
        .json(new ApiResponse(false, "Course Id is required"));
    }
    const course = await Course.findOne({ courseid: courseid });
    if (!course) {
      return res.status(404).json(new ApiResponse(false, "Course Not Found"));
    }
    const final_data = [];
    for (let i = 0; i < course.section.length; i++) {
      const data = course.section[i];
      data.push(final_data);
    }
    res.status(200).json(new ApiResponse(true, final_data));
  } catch (error) {
    res.status(500).json(new ApiError(false, error.message));
  }
};
export {
  CreateCourse,
  GetAllCourses,
  AddCourseStudent,
  GetCourse,
  AddSection,
  AddMcq,
  GetMcqSection,
  GetSection,
};
