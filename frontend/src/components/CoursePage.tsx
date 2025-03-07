"use client"
import { useEffect, useState} from "react";
import CourseSidebar from "./CourseSideBar";
import QuestionEditor from "./QuestionEditor";
import { Course } from "@/libs/apis/client";
type Courseprops={
    course:Course
}
const CoursePage:React.FC<Courseprops> = ({ course }) => {
  useEffect(() => {
   const token = localStorage.getItem('token');
   console.log(token);
  }, [])
  
  const [selectedSection, setSelectedSection] = useState(course.sections[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(selectedSection.questions[0]);
  const [code, setCode] = useState("// Write your code here...");
  return (
    <div className="h-screen w-full bg-[#191919] text-white">
      <CourseSidebar
        course={course}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />
      <div className="flex-grow">
        {selectedQuestion ? (
         <QuestionEditor selectedQuestion={selectedQuestion} code={code} setCode={setCode} />
        ) : (
          <p className="p-4">Select a question to start coding.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
