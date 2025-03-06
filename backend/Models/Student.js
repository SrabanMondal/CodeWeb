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
		courses_enrolled: [
			{
				type: mongoose.Schema.Types.ObjectId,
			},
		],
		courses_attempted: [
			{
				type: mongoose.Schema.Types.ObjectId,
			},
		],
		courses_marks: [
			{
				course: {
					type: mongoose.Schema.Types.ObjectId,
				},
				marks: {
					type: String,
				},
			},
		],
	},
	{ version_key: false },
);

const Student = mongoose.model("Student", StudentScheme);

export default Student;
