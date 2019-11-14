import { IComment } from "../../utils/Models";
import { post, get, put, deleteEntity } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { createHeader } from "../../services/UtilityServices";

export function postComment(comment:IComment, token:string){
    let headeers = createHeader(token);
    
    return post(API_CALLS.comment,comment,headeers);
}

export function fetchCommentList(postId:string){
    return get(API_CALLS.commentList+postId);
}

export function updateComment(comment:IComment, token:string){
    let headeers = createHeader(token);
    
    return put(API_CALLS.comment,comment,headeers);
}

export function deleteComment(id:string, token:string){
    let url = API_CALLS.comment+"/"+id;
    let headers = createHeader(token);
    
    return deleteEntity(API_CALLS.comment+id,headers);
}