import { IAuth0Contex, IUserCredential } from "../../utils/Structures";
import { post, get } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";

// export function Log(text: string) {
//     console.log(text);
// }

export function FetchData(myContext: any, iteration: number) {
    return new Promise(async (resolve, reject) => {
        let context = myContext as IAuth0Contex;
        console.log(context);
        if (context.isAuthenticated) {
            let token = await context.getTokenSilently();
            let user = context.user as IUserCredential;
            fetchRecommendedData(token, user, iteration).then(data => {
                resolve(data);
            }, err => {
                reject(err);
            });
        }
        else {
            fetchLatestQuestion(iteration).then(data=>{
                resolve(data);
            }, err=>{
                reject(err);
            });
        }
    });
}


function fetchRecommendedData(token: string, user: IUserCredential, iteration: number) {
    let url = 'api/questions/recommend/' + user.sub + "/" + iteration;
    let headers = createHeader(token);
    return new Promise((resolve: any, reject: any) => {
        console.log("fetching recommended questions:");
        post(url, headers, user).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });

}


function fetchLatestQuestion(iteration: number) {
    let url = 'api/questions/latest/' + iteration + "/";

    return new Promise((resolve, reject) => {
        get(url).then(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });


}