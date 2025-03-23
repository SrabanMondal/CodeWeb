import mongoose from "mongoose";

const CourseScheme = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    courseid: {
      type: String,
    },
    mcqsection: [
      {
        title: {
          type: String,
        },
        questions: [
          {
            title: {
              type: String,
            },
	    description: {
              type: String,
            },
            options: [
              {
                type: String,
              },
            ],
          },
        ],
      },
    ],
    section: [
      {
        title: {
          type: String,
        },
        questions: [
          {
            title: {
              type: String,
            },
            description: {
              type: String,
            },
            testcases: [{
              input:{
                type: String,
              },
	      output:{
		type: String
	      }
	     }],
          },
        ],
      },
    ],
   students:[{
	type:mongoose.Schema.Types.ObjectId
   }],
  },
  { versionKey: false },
);

const Course = mongoose.model("Course", CourseScheme);

export default Course;
