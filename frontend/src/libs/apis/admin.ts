import axios, { AxiosResponse } from "axios";
import { Mcqs, Section, SectionQuestion} from "./client";
import { log } from "console";
//const api = "http://localhost:3000"
//const api2 = "http://localhost:4500"
const api3 = "http://localhost:4900"
type ApiRes={
    status: boolean,
    message: string
}
export async function createcourse(courseid:string, title:string): Promise<boolean>{
    try {
        const response:AxiosResponse<ApiRes> = await axios.post(api3+'/api/v1/course/create',{
            courseid,
            title
        })
        return response.data.status
    } catch (error) {
        console.log(error)
        return false;
    }
}
export async function addcourseStudent(studentemail:string, coursetitle:string): Promise<boolean>{
    try {
        const response:AxiosResponse<ApiRes> = await axios.post(api3+'/api/v1/course/add',{
            studentemail,
            coursetitle
        })
        return response.data.status
    }
    catch (error) {
        console.log(error)
        return false;
    }
}
export async function addMcq(courseid:string,title:string, questions: string[] ,description:string[] ,options:string[][]){
    try {
        const response:AxiosResponse<ApiRes> = await axios.post(api3+'/api/v1/course/addmcq',{
            title,
            description,
            options
        })
        return response.data.status;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}
export async function addSection(courseid:string,title:string, questions:SectionQuestion[]){
    try {
        const response:AxiosResponse<ApiRes> = await axios.post(api3+'/api/v1/course/addsection',{
            courseid,
            sectiontitle:title,
            questions:questions
        })
        return response.data.status;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}

export async function getsections(courseid:string): Promise<Section[]|null> {
    try {
      const response = await axios.post(api3 + `/api/courses/getsection`,{
        courseid
      });
      return response.data;
    } catch (error) {
        console.log(error)
      return null;
    }
  }
export async function getmcqs(courseid:string): Promise<Mcqs[]|null> {
    try {
      const response = await axios.post(api3 + `/api/courses/getmcq`,{
        courseid
      });
      return response.data;
    } catch (error) {
        console.log(error)
      return null;
    }
  }
export async function getcourses(): Promise<course[]|null> {
    try {
      const response = await axios.get(api3 + `/api/courses/getall`);
      return response.data;
    } catch (error) {
        console.log(error)
      return null;
    }
  }
