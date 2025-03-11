import axios from "axios";
import { AxiosResponse } from "axios";
const api = "http://localhost:3000"
const api2 = "http://localhost:4500"
const api3 = "http://localhost:4900"
export type Question ={
    id: string,
    question: string,
    description: string
}
export type Section ={
    id: string,
    name: string,
    questions: Question[]
}
export type course ={
    courseid: string,
    title: string,
}
export type Course = course &{
    sections : Section[]
}
export type Student ={
  name?: string,
  ourses_completed: number,
  correct_percentage: number,
  average_grade: number,
}
export async function getcourse(id: string): Promise<Course|null> {
    try {
      const response = await axios.get(api + `/api/courses/${id}`);
      return response.data;
    } catch (error) {
        console.log(error)
      return null;
    }
  }
export async function getstudent(token: string): Promise<Student|null> {
  try {
      const response = await axios.get(api + `/api/students/`,{
        headers: {
          Authorization: `${token}`, 
        },});
      return response.data;
    } catch (error) {
        console.log(error)
      return null;
    }
}
export async function getcourses(token:string):Promise<course[]|null>{
  try {
      const response = await axios.get(api + `/api/courses`,{
        headers: {
          Authorization: `${token}`, 
        },});
      return response.data;
    } catch (error) {
      console.log(error)
      return null;
    }
}
export async function compilecode(code:string):Promise<string>{ 
    try {
	console.log("Hello Mondal");
        const response = await axios.post(api2+`/run`, {"language":"python","code":code});
	console.log(response);
        return response.data.output;
    } catch (error) {
        console.log(error)
        return "Compilation failed";
    }
}
export async function login(email:string, password:string):Promise<string|null>{
  try {
    console.log("Hello Mondal");
    const response = await axios.post(api3 + `/api/v1/main/login`, { email, password });
    return response.data.token;
  } catch (error) {
    console.error(error);
    return null;
  }
}
