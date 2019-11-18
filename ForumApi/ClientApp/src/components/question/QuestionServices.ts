import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";

export const questionService = {
    getAnswerCount(questionId:string){
        let url = API_CALLS.answerCount+questionId;

        return httpService.get(url);
    },
    getUser(id:string){
        let url = API_CALLS.users+id;
        return httpService.get(url);
    }
    
}


