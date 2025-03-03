import { useState } from "react";
import Editor from "@monaco-editor/react";
import { compilecode, Question } from "@/libs/apis/client";

const languages = ["javascript", "python", "c", "cpp", "java"];

type QuestionProps = {
  selectedQuestion: Question;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const QuestionEditor: React.FC<QuestionProps> = ({ selectedQuestion, code, setCode }) => {
  const [language, setLanguage] = useState("javascript");
  const [output, setoutput] = useState('Run ur code to see output')
  const handleRun = async ()=>{
      const res = await compilecode(code)
      setoutput(res)
  }
  return (
    <div className="flex-1 flex w-full h-full">
      {/* Question Panel */}
      <div className="flex-1 w-1/2 max-h-[80vh] overflow-y-auto bg-black/60 text-white m-3 rounded-xl border-2 border-black shadow-black overflow-hidden shadow-2xl h-full">
        <h2 className="p-4 text-white bg-[#424242] text-lg font-semibold">Q{selectedQuestion.id}</h2>
        <h3 className="text-2xl font-semibold p-4 bg-[#333333]">{selectedQuestion.question}</h3>
        <p className="p-4 bg-[#333333]">Solve on your own</p>
      </div>

      {/* Code Editor Panel */}
      <div className="w-1/2 m-3 text-white flex flex-col gap-2">
        {/* Header with Language Selector and Buttons */}
        <div className=" bg-[#191919] border border-gray-700 rounded-lg">

        <div className="flex items-center justify-between gap-4 px-4 py-2 bg-[#222] border-b border-gray-600">
          <h3 className="text-lg font-semibold"> Code</h3>
          <div className="flex gap-3">
          <button onClick={handleRun} className="px-3 py-1 cursor-pointer bg-green-500 text-white rounded-md hover:bg-green-700 transition">
            Run
          </button>
          <button className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
          </div>
          <div className="relative">

          <select
            className="p-2 bg-[#424242] text-white border-none rounded-md focus:ring-2 focus:ring-black appearance-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            >
            {languages.map((lang) => (
              <option key={lang} value={lang} className="hover:bg-gray-700 bg-[#333333] text-white">
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
            ▼
          </div>
            </div>
        </div>
        {/* Editor */}
        <div className="flex-1">
          <Editor
            height="45vh"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(newValue) => setCode(newValue || "")}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              padding: { top: 10 },
            }}
            />
        </div>
            </div>

        {/* Output / Testcases */}
        <div className="p-4 bg-[#222] rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Output / Test Cases</h3>
          <div className="h-28 bg-black text-green-400 p-2 rounded-md overflow-y-auto text-sm">
            <p>{output}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
