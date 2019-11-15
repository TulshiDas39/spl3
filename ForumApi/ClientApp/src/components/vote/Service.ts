import { IVote } from "../../utils/Models";
import { API_CALLS } from "../../utils/api_calls";
import { PostType } from "../../utils/Enums";
import { put, post, get } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";

export function postVote(token:string, vote:IVote){
    console.log('voting');
    let headers = createHeader(token);
    let url = API_CALLS.vote;

    return post(url,vote,headers);
}

export function getVoteStatus(postId:string, userId:string, postType:PostType, token:string){
    let url = API_CALLS.vote+postId+"/"+userId+"/"+postType;
    let headers = createHeader(token);

    return get(url,headers);
}