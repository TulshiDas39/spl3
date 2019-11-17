import { IComment, IVote } from "../../utils/Models";
import { createHeader } from "../../services/UtilityServices";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { PostType, VoteStatus } from "../../utils/Enums";

export const commentService = {
    postRate(token: string, userId: string, commentId: string, rateType:VoteStatus) {
        let headers = createHeader(token);
        let data:IVote = {
            id:undefined as any,
            isUpvote:rateType == VoteStatus.UPVOTED?true:false,
            postId:commentId,
            postType:PostType.COMMENT,
            userId:userId
        };

        return httpService.post(API_CALLS.vote,data,headers);
    },

    
    updateComment(comment:IComment, token:string){
        let headeers = createHeader(token);
        
        return httpService.put(API_CALLS.comment,comment,headeers);
    },

}