import mongoose from "mongoose";

const CourseScheme = new mongoose.Schema(
	{
		Title: {
			type: String,
		},
		CourseId: {
			type: String,
		},
		Sections: [
			{
				id: {
					type: String,
				},
				Name: {
					type: String,
				},
				Questions: [
					{
						id: {
							type: String,
						},
						question: {
							type: String,
						},
						Description: {
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
