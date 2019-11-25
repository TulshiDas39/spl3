import { API_CALLS } from "../../utils/api_calls";
import { httpService } from "../../services/HttpService";
import { utilityService } from "../../services/UtilityService";
import { IVote } from "../../utils/Models";
import { PostType } from "../../utils/Enums";

export const postService = {
    postVote(token: string, vote: IVote) {
        console.log('voting');
        let headers = utilityService.createHeader(token);
        let url = API_CALLS.vote;

        return httpService.post(url, vote, headers);
    },
    getAnswer(answerId: string) {
        let url = API_CALLS.answers + answerId;

        return httpService.get(url);
    },

    getVoteStatus(postId: string, userId: string, postType: PostType, token: string){
        let url = API_CALLS.vote + postId + "/" + userId + "/" + postType;
        let headers = utilityService.createHeader(token);

        return httpService.get(url, headers).then(data=>{
            if(data==1) return true;
            if(data == -1) return false;
            return undefined;
        });
    },
    

}