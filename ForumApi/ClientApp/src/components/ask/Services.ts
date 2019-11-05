import { IQuestion } from "../../utils/Models";
import { post } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";

export function postQuestion(data:IQuestion, token:string){
    let url = 'api/questions';
    let headers = createHeader(token);
    return new Promise((resolve, reject)=>{
        post(url,headers,data).then(data=>{
            resolve(data);
        },err=>{
            reject(err);
        });
    })
}