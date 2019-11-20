import { IQuestion } from "../../utils/Models";
import { httpService } from "../../services/HttpService";
import { utilityService } from "../../services/UtilityService";
import { API_CALLS } from "../../utils/api_calls";

export const askServices = {
    getSimilarQuestion(data: string, token: string) {
        let url = API_CALLS.similarQuestions + data;
        let headers = utilityService.createHeader(token);
        return httpService.get(url, headers);
    },
    postQuestion(data: IQuestion, token: string) {
        let url = 'api/questions';
        let headers = utilityService.createHeader(token);

        return httpService.post(url, data, headers);
    }
}