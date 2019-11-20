import { httpService } from "../../../services/HttpService"
import { API_CALLS } from "../../../utils/api_calls"
import { utilityService } from "../../../services/UtilityService";
import { ITag } from "../../../utils/Models";

export const tagService = {
    getTagInfoList(iteration: number) {
        return httpService.get(API_CALLS.tagList + iteration);
    },
    followTag(tagId: string, userId: string, token: string) {
        let headers = utilityService.createHeader(token);
        let url = API_CALLS.followTag + tagId + "/" + userId;

        return httpService.put(url, {}, headers);
    },
    unFollowTag(tagId: string, userId: string, token: string) {
        let headers = utilityService.createHeader(token);
        let url = API_CALLS.unFollowTag + tagId + "/" + userId;

        return httpService.put(url, {}, headers);
    },
    postNewTag(tag: string, token: string) {
        let headers = utilityService.createHeader(token);
        let tagItem: ITag = {
            description: "",
            id: undefined as any,
            name: tag,
            users: 0
        };

        return httpService.post(API_CALLS.tagList, tagItem, headers);
    }
}