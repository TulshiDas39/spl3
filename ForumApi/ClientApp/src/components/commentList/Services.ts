import { IComment } from "../../utils/Models";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { createHeader } from "../../services/UtilityServices";

export const service = {
    postComment(comment:IComment, token:string){
        let headeers = createHeader(token);
        
        return httpService.post(API_CALLS.comment,comment,headeers);
    },
    
    fetchCommentList(postId:string){
        return httpService.get(API_CALLS.commentList+postId);
    },
    
    updateComment(comment:IComment, token:string){
        let headeers = createHeader(token);
        
        return httpService.put(API_CALLS.comment,comment,headeers);
    },
    
    deleteComment(id:string, token:string){
        let url = API_CALLS.comment+"/"+id;
        let headers = createHeader(token);
        
        return httpService.deleteEntity(API_CALLS.comment+id,headers);
    }
}

