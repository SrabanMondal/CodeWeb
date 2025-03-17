import axios, { AxiosResponse } from "axios";
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
export async function addMcq(title:string, questions: string[] ,description:string[] ,options:string[][]){
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
export async function addSection(title:string, questions:Array<string>,  description:string[], testcase:string[]){
    try {
        const response:AxiosResponse<ApiRes> = await axios.post(api3+'/api/v1/course/addsection',{
            title,
            description,
            testcase
        })
        return response.data.status;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}