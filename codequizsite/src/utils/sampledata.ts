import { Course } from "@/libs/apis/client";

export const coursesdata: Course[] = [
    {
        id: "1",
        name: "JavaScript Essentials",
        sections: [
            {
                id: "101",
                name: "Basics",
                questions: [
                    { id: "1", question: "What is the difference between `let`, `var`, and `const`?" },
                    { id: "2", question: "What are JavaScript data types?" }
                ],
            },
            {
                id: "102",
                name: "Functions",
                questions: [
                    { id: "3", question: "What is a higher-order function?" },
                    { id: "4", question: "What is function hoisting?" }
                ],
            }
        ],
    },
    {
        id: "2",
        name: "Next.js Mastery",
        sections: [
            {
                id: "201",
                name: "Routing",
                questions: [
                    { id: "q5", question: "How do you create dynamic routes in Next.js?" },
                    { id: "q6", question: "What is shallow routing in Next.js?" }
                ],
            },
            {
                id: "202",
                name: "API Routes",
                questions: [
                    { id: "q7", question: "How do you create an API route in Next.js?" },
                    { id: "q8", question: "What is the difference between app and pages directory in Next.js?" }
                ],
            }
        ],
    },
];
