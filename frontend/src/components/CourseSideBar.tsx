import { Course, Question, Section } from "@/libs/apis/client";
import { Dispatch, SetStateAction } from "react";

type SideBarProps = {
  course: Course;
  selectedSection: Section;
  setSelectedSection: Dispatch<SetStateAction<Section>>;
  selectedQuestion: Question;
  setSelectedQuestion: Dispatch<SetStateAction<Question>>;
};

const CourseSidebar: React.FC<SideBarProps> = ({
  course,
  selectedSection,
  setSelectedSection,
  selectedQuestion,
  setSelectedQuestion,
}) => {
  return (
    <div className="w-full flex flex-col bg-black shadow-lg overflow-hidden">
      {/* Top Section */}
      <div className="w-full flex items-center justify-between py-3 px-4 bg-[#000] text-[#dcdcdc] border-b border-gray-700">
        {/* Course Name */}
        <h2 className="text-lg font-semibold">{course.title}</h2>

        {/* Section Selector */}
        <div className="relative">
          <select
            className="w-xs px-2 py-2 bg-[#424242] text-white border-none rounded-md focus:ring-black appearance-none cursor-pointer"
            value={selectedSection.id}
            onChange={(e) => {
              const section = course.sections.find((sec) => sec.id === e.target.value);
              setSelectedSection(section || course.sections[0]);
              setSelectedQuestion(section?.questions[0] || course.sections[0].questions[0]);
            }}
          >
            {course.sections.map((section) => (
              <option
                key={section.id}
                value={section.id}
                className="bg-[#333333] text-white hover:bg-gray-700 rounded-md py-3 px-6 transition-colors"
              >
                {section.name}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
            ▼
          </div>
        </div>

        {/* Student Name */}
        <p className="text-sm font-medium">👤 John Doe</p>
      </div>

      {/* Horizontal Question List */}
      <div className="overflow-x-auto whitespace-nowrap py-3 px-2 bg-[#191919] flex items-center">
        {selectedSection.questions.map((question) => (
          <button
            key={question.id}
            onClick={() => setSelectedQuestion(question)}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedQuestion.id === question.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            Q{question.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
