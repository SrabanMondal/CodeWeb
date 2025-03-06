// components/DashboardPage.tsx
import React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { courses } from "@/utils/sampledata";
export type Course = {
  id: string;
  name: string;
  description?: string;
};

type DashboardPageProps = {
  courses: Course[];
};

const accentColors = [
  "#ff4d4d", // warm red
  "#ffa64d", // soft orange
  "#80ff80", // mint green
  "#80d4ff", // cool blue
  "#ff80bf", // gentle pink
  "#c280ff", // muted purple
  "#80ffea", // light cyan
];

const DashboardPage: React.FC<DashboardPageProps> = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold">Hi, User</h1>
        <FaUserCircle size={48} className="text-gray-200" />
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-8">Your Courses</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course, index) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div
                className="p-6 bg-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                style={{
                  border: "4px solid",
                  borderColor: accentColors[index % accentColors.length],
                }}
              >
                <h3 className="text-xl font-bold text-gray-100">{course.name}</h3>
                <p className="mt-2 text-gray-300">
                  {course.description || "No description available"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
