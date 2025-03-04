import mongoose from "mongoose";

const StudentScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { version_key: false },
);

const Student = mongoose.model("Student", StudentScheme);

export default Student;
