"use client";
import { addcourseStudent, createcourse } from "@/libs/apis/admin";
import { course } from "@/libs/apis/client";
import { useState, useEffect, FormEvent } from "react";

const getCourses = async ():Promise<course[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { title: "Math 101", courseid: "MATH101" },
          { title: "Physics 201", courseid: "PHY201" },
        ]),
      1000
    )
  );
};

export default function CourseComponent() {
  const [activeTab, setActiveTab] = useState("addCourse");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<course[]|null>(null); // State to store fetched courses

  // Fetch courses on component mount and after adding a course
  const fetchCourses = async () => {
    try {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    } catch (error) {
        console.log(error);
      setMessage("Failed to fetch courses. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch courses on component mount
  }, []);

  const handleAddCourse = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const result = await createcourse(courseId, courseName);
      if (result) {
        setMessage("Course added successfully");
        setCourseId("");
        setCourseName("");
        await fetchCourses(); // Refresh the course list after adding
      }
    } catch (error) {
        console.log(error);
      setMessage("Failed to add course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCourseToStudent = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const result = await addcourseStudent(courseTitle, studentEmail);
      if (result) {
        setMessage("Course added successfully to student");
        setCourseTitle("");
        setStudentEmail("");
      }
    } catch (error) {
        console.log(error);
      setMessage("Failed to assign course to student. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/90 p-6 rounded-xl shadow-md border border-gray-800/60">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => {
            setActiveTab("addCourse");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "addCourse"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Add Course
        </button>
        <button
          onClick={() => {
            setActiveTab("addToStudent");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "addToStudent"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Add to Student
        </button>
        <button
          onClick={() => {
            setActiveTab("viewCourses");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "viewCourses"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          View Courses
        </button>
      </div>

      {/* Add Course Form */}
      {activeTab === "addCourse" && (
        <form onSubmit={handleAddCourse} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Course ID
            </label>
            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter course ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter course name"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Add Course"}
          </button>
        </form>
      )}

      {/* Add to Student Form */}
      {activeTab === "addToStudent" && (
        <form onSubmit={handleAddCourseToStudent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Course Title
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter course title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Student Email
            </label>
            <input
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter student email"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? "Assigning..." : "Add to Student"}
          </button>
        </form>
      )}

      {/* View Courses */}
      {activeTab === "viewCourses" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Available Courses</h3>
          { courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.courseid}
                  className="p-4 bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h4 className="text-md font-semibold text-cyan-200">{course.title}</h4>
                  <p className="text-sm text-gray-400">ID: {course.courseid}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No courses available.</p>
          )}
        </div>
      )}

      {/* Message */}
      {message && (
        <p className={`mt-4 text-center text-sm ${message.includes("success") ? "text-cyan-200" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}