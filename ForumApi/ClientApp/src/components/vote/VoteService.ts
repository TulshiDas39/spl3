import { IVote } from "../../utils/Models";
import { API_CALLS } from "../../utils/api_calls";
import { PostType } from "../../utils/Enums";
import { httpService } from "../../services/HttpService";
import { utilityService } from "../../services/UtilityService";

export const voteService={

    postVote(token: string, vote: IVote){
        console.log('voting');
        let headers = utilityService.createHeader(token);
        let url = API_CALLS.vote;

        return httpService.post(url, vote, headers);
    },
    getVoteStatus(postId: string, userId: string, postType: PostType, token: string){
        let url = API_CALLS.vote + postId + "/" + userId + "/" + postType;
        let headers = utilityService.createHeader(token);

        return httpService.get(url, headers);
    }
}


