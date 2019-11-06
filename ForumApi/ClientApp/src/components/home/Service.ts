import { IAuth0Context, IUserCredential } from "../../utils/Structures";
import { post, get } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { IQuestion } from "../../utils/Models";


export async function fetchRecommendedQuestions(myContext: any, iteration: number) {
    let context = myContext as IAuth0Context;
    let token = await context.getTokenSilently();
    let headers = createHeader(token);
    let user = context.user as IUserCredential;
    let url = 'api/questions/recommend/' + user.sub + "/" + iteration;

    return new Promise<IQuestion[]>((resolve: any, reject: any) => {
        console.log("fetching recommended questions:");
        post(url, headers, user).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });

}


export function fetchLatestQuestion(iteration: number) {
    let url = 'api/questions/latest/' + iteration + "/";

    return new Promise<IQuestion[]>((resolve, reject) => {
        get(url).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });


}