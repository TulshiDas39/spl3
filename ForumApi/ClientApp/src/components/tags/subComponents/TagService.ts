import { httpService } from "../../../services/HttpService"
import { API_CALLS } from "../../../utils/api_calls"

export const tagService = {
    getTagInfoList(iteration:number){
        return httpService.get(API_CALLS.tagList+iteration);
    }
}