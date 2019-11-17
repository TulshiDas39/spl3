import { IAuth0Context, IUserCredential } from "../../utils/Structures";
import { httpService } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { IQuestion } from "../../utils/Models";
import { API_CALLS } from "../../utils/api_calls";


export const homeService = {
    fetchRecommendedQuestions(token:string, userId:string, iteration: number) {
        let headers = createHeader(token);
        let url = API_CALLS.recommendedQuestions + userId + "/" + iteration;
        console.log("fetching recommended questions:");
        return httpService.get(url, headers);
    },

    fetchLatestQuestion(iteration: number) {
        return httpService.get(API_CALLS.latestQuestions + iteration);
    },

    fetchAnswerLessQuestions(iteration: number) {
        return httpService.get(API_CALLS.answerlessQuestions + iteration);
    }
}

