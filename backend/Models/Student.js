import mongoose from "mongoose";

const StudentScheme = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
  },
  { version_key: false },
);

const Student = mongoose.model("Student", StudentScheme);

export default Student;
