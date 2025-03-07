// app/api/course/[id]/route.ts
import { Course } from "@/libs/apis/client";
import { coursesdata } from "@/utils/sampledata";
import {NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    const {id} = await params; // Extract dynamic route parameter
    const courses:Course[] = coursesdata
    const coursedata = courses.find((c) => c.courseid === id);
    if (!coursedata) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    console.log(coursedata.sections)

    return NextResponse.json(coursedata, { status: 200 });
}
