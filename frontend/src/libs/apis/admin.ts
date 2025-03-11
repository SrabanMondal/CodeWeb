import axios, { AxiosResponse } from "axios";
const api = "http://localhost:3000"
const api2 = "http://localhost:4500"
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
        return false;
    }
}