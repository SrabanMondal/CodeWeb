// pages/dashboard.js
"use client"
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Poppins, Roboto } from 'next/font/google';
import { course, getcourses, getstudent, Student } from '@/libs/apis/client';

const poppins = Poppins({ weight: '600', subsets: ['latin'] });
const roboto = Roboto({ weight: '400', subsets: ['latin'] });

const Dashboard = () => {
  // Sample data
  const username = 'John Doe';
  const cours = [
    { id: 'CS-101', name: 'Computer Science 101' },
    { id: 'MATH-201', name: 'Mathematics 201' },
    { id: 'ENG-301', name: 'English 301' },
  ];

  // Metrics values
  const coursesAttempted = cours.length;
  const accuracy = '85%';
  const overallGrade = 'B+';

  const [student, setstudent] = useState<Student|null>(null)
  const [courses, setcourses] = useState<course[]|null>(null)
  useEffect(() => {
   const fetchdata = async ()=>{
     const token = localStorage.getItem('token');
     if(token){
      const course = await getcourses(token)
      const studentdata = await getstudent(token)
      if(courses && studentdata){
        setstudent(studentdata)
        setcourses(course)
      }
     }
   }
   fetchdata()
  }, [courses])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('logged out');
  };

  return (
    <div className={`${roboto.className} min-h-screen bg-[#0F0F0F] text-[#F0F0F0]`}>
      {/* Header */}
      <header
        className="py-5 px-6 flex justify-between items-center border-b"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#333333" }}
      >
        <h1 style={{fontSize:'28px'}} className={`${poppins.className} text-2xl`}>Hi, {username}</h1>
        <button
          onClick={handleLogout}
          style={{fontSize:'28px'}}
          className="text-2xl hover:text-[#CCCCCC]"
          aria-label="Logout"
        >
          <FaSignOutAlt />
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Metrics Section */}
        <section
          className="py-8 border-b flex justify-center"
          style={{ borderColor: "#333333" }}
        >
          <div className="flex flex-row items-center w-full justify-around space-x-12">
            <div className="text-center">
              <div className="text-5xl font-bold" style={{ color: "#4FA1F9" }}>
                {coursesAttempted}
              </div>
              <div className="mt-2 text-lg">Courses Attempted</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold" style={{ color: "#4FA1F9" }}>
                {accuracy}
              </div>
              <div className="mt-2 text-lg">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold" style={{ color: "#4FA1F9" }}>
                {overallGrade}
              </div>
              <div className="mt-2 text-lg">Overall Grade</div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="mt-8">
          <h2 className={`${poppins.className} text-2xl mb-4`}>Courses</h2>
          <div className="flex flex-wrap gap-4">
            {cours.map((course) => (
              <div
                key={course.id}
                className="bg-[#1E1E1E] rounded p-8 shadow hover:shadow-lg transition duration-200 flex flex-col gap-6"
              >
                <strong className="block text-2xl" style={{ color: "#4FA1F9" }}>
                  {course.id}
                </strong>
                <p className="mt-1 text-md">{course.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
