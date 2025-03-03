import axios from "axios";
import { AxiosResponse } from "axios";
const api = "http://localhost:3000"
const api2 = "http://localhost:4500"
export type Question ={
    id: string,
    question: string,
}
export type Section ={
    id: string,
    name: string,
    questions: Question[]
}
export type Course={
    id: string;
    name: string;
    sections : Section[]
}
export async function getcourse(id: string): Promise<Course | null> {
    try {
      const response = await fetch(api + `/api/courses/${id}`, {
        cache: "force-cache",
      });
  
      if (!response.ok) return null;
    
      return response.json();
    } catch (error) {
        console.log(error)
      return null;
    }
  }
  
export async function compilecode(code:string):Promise<string>{ //yahi change kariyo, upar wala course api mat change karna
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
