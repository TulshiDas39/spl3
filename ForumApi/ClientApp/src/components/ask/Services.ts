import { IQuestion } from "../../utils/Models";
import { httpService } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";

export function postQuestion(data: IQuestion, token: string) {
    let url = 'api/questions';
    let headers = createHeader(token);

    return httpService.post(url, data, headers);
}