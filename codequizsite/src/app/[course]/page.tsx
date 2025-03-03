import CoursePage from '@/components/CoursePage'
import { getcourse } from '@/libs/apis/client'
import React from 'react'
type  CourseParams={
    params:{course:string}
}
const Page = async ({params}:CourseParams) => {
    const {course} = await params

    const coursedata = await getcourse(course)
    console.log(coursedata);
    if (coursedata){
      return <CoursePage course={coursedata}/>
    }
  return (
    <div>No Course Found</div>
  )
}

export default Page