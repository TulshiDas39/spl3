import { IComment } from "../../utils/Models";
import { post } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { createHeader } from "../../services/UtilityServices";

export function postComment(comment:IComment, token:string){
    let headeers = createHeader(token);
    
    return post(API_CALLS.comment,comment,headeers);
}