import { API_CALLS } from "../../utils/api_calls";
import { createHeader } from "../../services/UtilityServices";
import { post } from "../../services/HttpService";
import { IAnswer } from "../../utils/Models";

// export function postAnswer(data: object, token: string) {
//     let url = API_CALLS.createAnswer;
//     let headers = createHeader(token);

//     console.log('posing answer');
    
//     return new Promise<IAnswer>((resolve, reject) => {
//         post(url, headers, data).then(data => {
//             resolve(data);
//         }, err => {
//             reject(err);
//         })
//     })
    

// }