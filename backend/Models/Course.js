import mongoose from "mongoose";

const CourseScheme = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		courseid: {
			type: String,
		},
		sections: [
			{
				id: {
					type: String,
				},
				name: {
					type: String,
				},
				questions: [
					{
						id: {
							type: String,
						},
						question: {
							type: String,
						},
						description: {
							type: String,
						},
					},
				],
			},
		],
	},
	{ versionKey: false },
);

const Course = mongoose.model("Course", CourseScheme);

export default Course;
