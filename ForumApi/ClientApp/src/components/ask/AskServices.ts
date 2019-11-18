import { IQuestion } from "../../utils/Models";
import { httpService } from "../../services/HttpService";
import { utilityService } from "../../services/UtilityService";

export function postQuestion(data: IQuestion, token: string) {
    let url = 'api/questions';
    let headers = utilityService.createHeader(token);

    return httpService.post(url, data, headers);
}