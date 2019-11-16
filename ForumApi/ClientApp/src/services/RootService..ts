import { API_CALLS } from "../utils/api_calls";
import { httpService } from "./HttpService";

export const rootService = {
    getQuestion(questionId: string) {
        let url = API_CALLS.questions + questionId;

        return httpService.get(url);
    },
}