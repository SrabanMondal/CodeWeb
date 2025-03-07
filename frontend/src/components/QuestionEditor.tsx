import { useState } from "react";
import Editor from "@monaco-editor/react";
import { compilecode, Question } from "@/libs/apis/client";
import { FaPlay, FaPaperPlane } from "react-icons/fa";
import { BiCodeAlt, BiCodeBlock } from "react-icons/bi";
const languages = [ "python", "c", "cpp", "java"];

type QuestionProps = {
  selectedQuestion: Question;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const QuestionEditor: React.FC<QuestionProps> = ({ selectedQuestion, code, setCode }) => {
  const [language, setLanguage] = useState("c");
  const [output, setoutput] = useState('Run ur code to see output')
  const handleRun = async ()=>{
      const res = await compilecode(code)
      setoutput(res)
  }
  return (
    <div className="flex-1 flex w-full h-full bg-[#191919]">
      {/* Question Panel */}
      <div className="flex-1 w-1/2   bg-black/60 text-white m-3 rounded-xl border-[1px] border-white/50 shadow-black overflow-hidden shadow-2xl h-full">
      <div className=" flex bg-[#434343]">
        <h2 className="p-4 text-white text-lg font-semibold">Q{selectedQuestion.id}</h2>
        <h3 className="text-2xl font-semibold p-4 text-[#dcdcdc] ">{selectedQuestion.question}</h3>
      </div>
        <pre className="overflow-y-auto max-h-[90vh] px-4 pb-4 bg-[#191919] text-white whitespace-pre-line font-mono">{selectedQuestion.description}</pre>
      </div>
      {/* Code Editor Panel */}
      <div className="w-1/2 m-3 text-white flex flex-col gap-2 ">
        {/* Header with Language Selector and Buttons */}
        <div className=" bg-[#191919] rounded-[20px] overflow-hidden border-[1px] border-white/50">

        <div className="flex items-center justify-between gap-4 px-6 py-1 bg-[#424242] border-b border-gray-600">
          <h3 className="text-md font-semibold flex items-center gap-2"> <BiCodeAlt className="text-green-500" size={20}/> Code</h3>
          <div className="flex gap-3">
          <button
        onClick={handleRun}
        className="flex items-center gap-2 p-2 bg-[#333] shadow-2xl text-white rounded-lg  "
      >
        <FaPlay className="text-green-500 hover:text-green-700 transition-all duration-200" size={15} />
      </button>

      {/* Submit Button */}
      <button
        className="flex items-center gap-2 p-2 bg-[#333] text-white rounded-lg shadow-md "
      >
        <FaPaperPlane className="text-blue-500 hover:text-blue-700 transition-all duration-200" size={15} />
      </button>
          </div>
          <div className="relative">

          <select
            className="p-2 bg-[#333] text-white border-none rounded-md focus:ring-2 focus:ring-black appearance-none"
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
        <div style={{borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px'}} className="flex-1 overflow-hidden">
          <Editor
            height="60vh"
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
        <div className=" bg-[#222] rounded-[20px] overflow-hidden border-[1px] border-white/40">
          <h3 className="text-md font-semibold py-2 px-5 bg-[#424242]">Output / Test Cases</h3>
          <div className="h-28 bg-black text-green-400 p-2 rounded-md overflow-y-auto text-sm">
            <p>{output}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
