import { IAuth0Context, IUserCredential } from "../../utils/Structures";
import { post, get } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { IQuestion } from "../../utils/Models";
import { API_CALLS } from "../../utils/api_calls";


export async function fetchRecommendedQuestions(myContext: any, iteration: number) {
    let context = myContext as IAuth0Context;
    let token = await context.getTokenSilently();
    let headers = createHeader(token);
    let user = context.user as IUserCredential;
    let url = API_CALLS.recommendedQuestions + user.sub + "/" + iteration;

    return new Promise<IQuestion[]>((resolve: any, reject: any) => {
        console.log("fetching recommended questions:");
        post(url, user, headers).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });

}


export function fetchLatestQuestion(iteration: number) {

    return new Promise<IQuestion[]>((resolve, reject) => {
        get(API_CALLS.latestQuestions + iteration).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });


}

export function fetchAnswerLessQuestions(iteration:number){
    return new Promise<IQuestion[]>((resolve,reject)=>{
        get(API_CALLS.answerlessQuestions+iteration).then(data=>{
            resolve(data);
        }, err=>{
            reject(err);
        })
    })
}