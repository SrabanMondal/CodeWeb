import { Course } from "@/libs/apis/client";
export const courses=[{
    id: "1",
    name: "JavaScript Essentials",
    description: "Learn the basics of JavaScript",
  },{
    id: "2",
    name: "React Essentials",
    description: "Learn the basics of React",
  },{
    id: "3",
    name: "Node.js Essentials",
    description: "Learn the basics of Node.js",
  },{
    id: "4",
    name: "Next.js Essentials",
    description: "Learn the basics of Next.js",
  },{
    id: "5",
    name: "TypeScript Essentials",
    description: "Learn the basics of TypeScript",
  }
]
export const coursesdata: Course[] = [
    {
        courseid: "1",
        title: "JavaScript Essentials",
        sections: [
            {
                id: "101",
                name: "Basics",
                questions: [
                    { id: "1", question: "What is the difference between `let`, `var`, and `const`?" ,description:`
  Problem Statement:
  Write a function that takes a list of numbers and returns a new list containing only the even numbers.

  Example Input:
  {
    "numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  Example Output:
  {
    "evenNumbers": [2, 4, 6, 8, 10]
  }
  Problem Statement:
  Write a function that takes a list of numbers and returns a new list containing only the even numbers.

  Example Input:
  {
    "numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  Example Output:
  {
    "evenNumbers": [2, 4, 6, 8, 10]
  }
  Problem Statement:
  Write a function that takes a list of numbers and returns a new list containing only the even numbers.

  Example Input:
  {
    "numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  Example Output:
  {
    "evenNumbers": [2, 4, 6, 8, 10]
  }
` },
                    { id: "2", question: "What are JavaScript data types?",description:""}
                ],
            },
            {
                id: "102",
                name: "Functions",
                questions: [
                    { id: "3", question: "What is a higher-order function?",description: "What is a higher-order function" },
                    { id: "4", question: "What is function hoisting?",description:"" }
                ],
            }
        ],
    },
    {
        courseid: "2",
        title: "Next.js Mastery",
        sections: [
            {
                id: "201",
                name: "Routing",
                questions: [
                    { id: "q5", question: "How do you create dynamic routes in Next.js?",description:"" },
                    { id: "q6", question: "What is shallow routing in Next.js?",description:"" }
                ],
            },
            {
                id: "202",
                name: "API Routes",
                questions: [
                    { id: "q7", question: "How do you create an API route in Next.js?",description:"" },
                    { id: "q8", question: "What is the difference between app and pages directory in Next.js?",description:"" }
                ],
            }
        ],
    },
];
