import { httpService } from "../../services/HttpService"
import { API_CALLS } from "../../utils/api_calls"

export const userService = {
    getUsers(iteration:number){
        return httpService.get(API_CALLS.multipleUsers+iteration);
    }
}