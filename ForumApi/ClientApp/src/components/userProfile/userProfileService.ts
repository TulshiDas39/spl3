import { httpService } from "../../services/HttpService"
import { API_CALLS } from "../../utils/api_calls"

export const userProfileService = {
    getUserInfo(userId:string){
        return httpService.get(API_CALLS.userProfile+userId);
    }
}