import { IComment, IVote } from "../../utils/Models";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { PostType } from "../../utils/Enums";
import { utilityService } from "../../services/UtilityService";

export const commentService = {
    postRate(token: string, userId: string, commentId: string, rateType:boolean) {
        let headers = utilityService.createHeader(token);
        let data:IVote = {
            id:undefined as any,
            isUpvote:rateType,
            postId:commentId,
            postType:PostType.COMMENT,
            userId:userId
        };

        return httpService.post(API_CALLS.vote,data,headers);
    },

    
    updateComment(comment:IComment, token:string){
        let headeers = utilityService.createHeader(token);
        
        return httpService.put(API_CALLS.comment,comment,headeers);
    },

}