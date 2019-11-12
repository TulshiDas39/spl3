import { get, post, put, deleteEntity } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { API_CALLS } from "../../utils/api_calls";
import { IAnswer, IQuestion } from "../../utils/Models";

export function getQuestion(questionId: string) {
    let url = 'api/questions/' + questionId;

    return new Promise((resolve, reject) => {
        get(url).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        })
    })

}

export function updateQuestion(question: IQuestion, token:string) {
    let url = API_CALLS.updateQuestion;
    let headers = createHeader(token);

    return new Promise<void>((resolve, reject) => {
        put(url,question,headers).then(() => {
            resolve();
        }, err => {
            reject(err);
        })
    })

}

export function deleteQuestion(id:string, token:string){
    let url = API_CALLS.deleteQuestion+id;
    let headers = createHeader(token);

    return new Promise<void>((resolve,reject)=>{
        deleteEntity(url,headers).then(()=>{
            resolve();
        }, err=>{
            reject(err);
        })
    })

    

}

export function getAnswers(questionId: string) {
    let url = 'api/answers/get/' + questionId;
    let headers = createHeader("");

    return new Promise((resolve, reject) => {
        post(url, {}, headers).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        })
    })

}

export function postAnswer(data: object, token: string) {
    let url = API_CALLS.createAnswer;
    let headers = createHeader(token);

    console.log('posing answer');

    return new Promise<IAnswer>((resolve, reject) => {
        post(url, data, headers).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        })
    })


}

export function updateAnswer(data: IAnswer, token: string) {
    let url = API_CALLS.updateAnswer;
    let headers = createHeader(token);

    console.log('posing answer');

    return new Promise<void>((resolve, reject) => {
        put(url, data, headers).then(() => {
            resolve();
        }, err => {
            reject(err);
        })
    })

}

export function deleteAnswer(id: string, token: string) {
    let url = API_CALLS.deleteAnswer + id;
    let headers = createHeader(token);

    return new Promise<void>((resolve, reject) => {
        deleteEntity(url, headers).then(data => {
            resolve();
        }, err => {
            reject(err);
        })
    })


}

export function countView(id:string){
    let url = API_CALLS.viewQuestionCount+id;
    console.log('counting view:');

    let data= localStorage.getItem('views');
    if(!data) {
        localStorage.setItem('views',JSON.stringify([]));
        data="[]";
    };
    
    let views:string[] = JSON.parse(data);
    if(views.indexOf(id) != -1) return;

    put(url,{}).then(()=>{
        views.push(id);
        localStorage.setItem('views',JSON.stringify(views));
        console.log('counted view');
    },err=>{
        console.error(err);
    })
}