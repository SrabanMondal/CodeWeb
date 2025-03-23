"use client";
import { addSection, getsection } from "@/libs/apis/admin";
import { Section, SectionQuestion } from "@/libs/apis/client";
import { log } from "console";
import { title } from "process";
import { useState, useEffect, FormEvent } from "react";

// Placeholder API functions (replace with your actual implementations)



export default function SectionComponent() {
  const [activeTab, setActiveTab] = useState("addSection");
  const [sectionTitle, setSectionTitle] = useState("");
  const [courseid, setcourseid] = useState("");
  const [questions, setQuestions] = useState<SectionQuestion[]>([{ title: "", description: "", testcases: "" }]);
  const [sections, setSections] = useState<Section[]|null>(null);
  const [expandedSection, setExpandedSection] = useState<number|null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch sections on component mount and after adding a section
  const fetchSections = async () => {
      const fetchedSections = await getsection();
      setSections(fetchedSections);
      if(!fetchedSections){
      setMessage("Failed to fetch sections. Please try again.");
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Handle dynamic question input changes
  const handleQuestionChange = (index:number, field:keyof SectionQuestion, value:string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question input
  const addQuestion = () => {
    setQuestions([...questions, { title: "", description: "", testcases: "" }]);
  };

  // Remove a question input
  const removeQuestion = (index:number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  // Handle section submission
  const handleAddSection = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sectionTitle || questions.some((q) => !q.title || !q.description || !q.testcases)) {
      setMessage("Please fill out all fields.");
      return;
    }
    setIsLoading(true);
    setMessage("");
      const result = await addSection(courseid,title,questions);
      if (result) {
        setMessage("Section added successfully");
        setSectionTitle("");
        setQuestions([{ title: "", description: "", testcases: "" }]);
        await fetchSections();
      }
    else {
      setMessage("Failed to add section. Please try again."); 
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900/90 p-6 rounded-xl shadow-md border border-gray-800/60">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => {
            setActiveTab("addSection");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "addSection"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Add Section
        </button>
        <button
          onClick={() => {
            setActiveTab("viewSections");
            setMessage("");
          }}
          className={`pb-2 px-4 text-lg font-medium transition-colors duration-200 ${
            activeTab === "viewSections"
              ? "text-cyan-200 border-b-2 border-cyan-200"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          View Sections
        </button>
      </div>

      {/* Add Section Form */}
      {activeTab === "addSection" && (
        <form onSubmit={handleAddSection} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Course Id
            </label>
            <input
              type="text"
              value={courseid}
              onChange={(e) => setcourseid(e.target.value)}
              className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              placeholder="Enter Course Id"
              required
            />
          </div>
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
            {questions.map((question, index) => (
              <div key={index} className="p-4 bg-gray-800/70 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Question {index + 1} Title
                  </label>
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => handleQuestionChange(index, "title", e.target.value)}
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
                    onChange={(e) => handleQuestionChange(index, "description", e.target.value)}
                    className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Enter question description"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Test Case
                  </label>
                  <input
                    type="text"
                    value={question.testcases}
                    onChange={(e) => handleQuestionChange(index, "testcases", e.target.value)}
                    className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    placeholder="Enter test case"
                    required
                  />
                </div>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
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
            {isLoading ? "Adding..." : "Add Section"}
          </button>
        </form>
      )}

      {/* View Sections */}
      {activeTab === "viewSections" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Available Sections</h3>
          {sections && sections.length > 0 ? (
            <div className="space-y-3">
              {sections.map((section, index) => (
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
                          <p className="text-sm text-gray-400 mt-1">
                            <strong>Test Case:</strong> {question.testcases}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No sections available.</p>
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
