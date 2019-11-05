import { get, post } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";

export function getQuestion(questionId: string) {
    let url = 'api/questions/' + questionId;

    return new Promise((resolve, reject) => {
        get(url).then(data => {
            resolve(data);
        }, err=>{
            reject(err);
        })
    })

}

export function getAnswers(questionId: string) {
    let url = 'api/answers/get/'+questionId;
    let headers = createHeader("");

    return new Promise((resolve, reject) => {
        post(url,headers,{}).then(data => {
            resolve(data);
        }, err=>{
            reject(err);
        })
    })

}