"use client";
import { useState } from "react";
import CourseComponent from "@/components/CourseComponent";
import SectionComponent from "@/components/SectionComponent";
import MCQComponent from "@/components/MCQSection";
export default function AdminPage() {
  const [activeNav, setActiveNav] = useState("Course");

  const navItems = ["Course", "Section", "MCQs"];

  return (
    <div
      className="flex h-screen w-full text-gray-100"
      style={{
        background: "linear-gradient(to right, rgba(31, 41, 55, 0.9) 0%, rgba(47, 61, 76, 0.9) 40%, rgba(55, 65, 81, 0.9) 70%, rgba(31, 41, 55, 0.9) 100%)",
      }}
    >
      {/* Sidebar */}
      <div className="w-64 bg-gray-800/90 shadow-lg p-6 space-y-5">
        <h1 className="text-2xl font-semibold text-cyan-300 mb-6 border-b border-gray-700 pb-2">
          Admin Panel
        </h1>
        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => setActiveNav(item)}
            className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-700/70 ${
              activeNav === item
                ? "bg-gray-700 text-cyan-200 font-medium"
                : "text-gray-400"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="text-3xl font-bold text-cyan-200 mb-6 border-b border-gray-700 pb-2">
          Admin Dashboard - {activeNav}
        </header>
        {activeNav === "Course" && <CourseComponent />}
        {activeNav === "Section" && <SectionComponent />}
        {activeNav === "MCQs" && <MCQComponent />}
      </div>
    </div>
  );
}