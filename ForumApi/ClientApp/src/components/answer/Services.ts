import { get, post } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { API_CALLS } from "../../utils/api_calls";
import { IAnswer } from "../../utils/Models";

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

export function postAnswer(data: object, token: string) {
    let url = API_CALLS.createAnswer;
    let headers = createHeader(token);

    console.log('posing answer');
    
    return new Promise<IAnswer>((resolve, reject) => {
        post(url, headers, data).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        })
    })
    

}