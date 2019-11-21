import { API_CALLS } from "../../utils/api_calls"
import { httpService } from "../../services/HttpService"

export const searchResultService = {
    fetchSearchedQuestions(query:string){
        return httpService.get(API_CALLS.searchQuestions+query)
    }
}