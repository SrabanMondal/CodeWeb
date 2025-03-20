"use client";
import { addMcq, getcourses, getmcqs } from "@/libs/apis/admin";
import { course, McqQuestion, Mcqs } from "@/libs/apis/client";
import { useState, useEffect } from "react";

// Placeholder API functions (replace with your actual implementations)


export default function MCQComponent() {
  const [activeTab, setActiveTab] = useState("addMCQ");
  const [sectionTitle, setSectionTitle] = useState("");
  const [questions, setQuestions] = useState<McqQuestion[]>([{ title: "", description: "", options: [""] }]);
  const [courses, setCourses] = useState<course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [mcqs, setMCQs] = useState<Mcqs[]>([]);
  const [expandedSection, setExpandedSection] = useState<number|null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch courses on component mount
  const fetchCourses = async () => {
    try {
      const fetchedCourses = await getcourses();
      if (!fetchedCourses) return
      setCourses(fetchedCourses);
      if (fetchedCourses.length > 0) {
        setSelectedCourse(fetchedCourses[0].courseid); // Default to first course
      }
    } catch (error) {
      setMessage("Failed to fetch courses. Please try again.");
    }
  };

  // Fetch MCQs when a course is selected
  const fetchMCQs = async (courseId) => {
    if (!courseId) return;
    try {
      const fetchedMCQs = await getmcqs(courseId);
      if (!fetchedMCQs) return;
      setMCQs(fetchedMCQs);
    } catch (error) {
      setMessage("Failed to fetch MCQs. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchMCQs(selectedCourse);
  }, [selectedCourse]);

  // Handle dynamic question input changes
  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle dynamic option input changes
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([...questions, { title: "", description: "", options: [""] }]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  // Add a new option to a question
  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  // Remove an option from a question
  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length > 1) {
      updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== oIndex);
      setQuestions(updatedQuestions);
    }
  };

  // Handle MCQ section submission
  const handleAddMCQ = async (e) => {
    e.preventDefault();
    if (!sectionTitle || questions.some((q) => !q.title || !q.description || q.options.some((o) => !o))) {
      setMessage("Please fill out all fields.");
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const result = await addMcq(selectedCourse,sectionTitle,questions.map((q) => q.title),questions.map((q) => q.description),questions.map((q) => q.options));
      if (result) {
        setMessage("MCQ section added successfully.");
        setSectionTitle("");
        setQuestions([{ title: "", description: "", options: [""] }]);
        await fetchMCQs(selectedCourse);
      }
    } catch (error) {
      setMessage("Failed to add MCQ section. Please try again.");
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
            setActiveTab("addMCQ");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "addMCQ"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Add MCQ
        </button>
        <button
          onClick={() => {
            setActiveTab("viewMCQs");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "viewMCQs"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          View MCQs
        </button>
      </div>

      {/* Add MCQ Form */}
      {activeTab === "addMCQ" && (
        <form onSubmit={handleAddMCQ} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter section title"
              required
            />
          </div>

          {/* Dynamic Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-200">Questions</h3>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="p-4 bg-gray-800/70 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Question {qIndex + 1} Title
                  </label>
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleQuestionChange(qIndex, "title", e.target.value)}
                    className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Enter question title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={question.description}
                    onChange={(e) => handleQuestionChange(qIndex, "description", e.target.value)}
                    className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Enter question description"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Options
                  </label>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="flex-1 p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                      {question.options.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeOption(qIndex, oIndex)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="text-sm text-cyan-200 hover:text-cyan-100"
                  >
                    + Add Option
                  </button>
                </div>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove Question
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="mt-2 text-sm text-cyan-200 hover:text-cyan-100"
            >
              + Add Another Question
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? "Adding..." : "Add MCQ Section"}
          </button>
        </form>
      )}

      {/* View MCQs */}
      {activeTab === "viewMCQs" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Select Course</h3>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            {courses && courses.map((course) => (
              <option key={course.courseid} value={course.courseid}>
                {course.title} ({course.courseid})
              </option>
            ))}
          </select>

          <h3 className="text-lg font-medium text-gray-200 mt-4 mb-2">
            MCQs for {courses.find((c) => c.courseid === selectedCourse)?.title || "Selected Course"}
          </h3>
          {mcqs.length > 0 ? (
            <div className="space-y-3">
              {mcqs.map((section, index) => (
                <div
                  key={index}
                  className="bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-sm"
                >
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === index ? null : index)
                    }
                    className="w-full p-4 text-left flex justify-between items-center"
                  >
                    <h4 className="text-md font-semibold text-cyan-200">{section.title}</h4>
                    <span className="text-gray-400">
                      {expandedSection === index ? "−" : "+"}
                    </span>
                  </button>
                  {expandedSection === index && (
                    <div className="p-4 pt-0 space-y-3">
                      {section.questions.map((question, qIndex) => (
                        <div
                          key={qIndex}
                          className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/30"
                        >
                          <h5 className="text-sm font-medium text-gray-200">
                            {qIndex + 1}. {question.title}
                          </h5>
                          <p className="text-sm text-gray-400 mt-1">
                            <strong>Description:</strong> {question.description}
                          </p>
                          <div className="mt-1">
                            <strong className="text-sm text-gray-400">Options:</strong>
                            <ul className="list-disc list-inside text-sm text-gray-500 mt-1">
                              {question.options.map((option, oIndex) => (
                                <li key={oIndex}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No MCQ sections available for this course.</p>
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