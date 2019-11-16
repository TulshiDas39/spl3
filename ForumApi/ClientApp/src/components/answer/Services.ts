import { httpService } from "../../services/HttpService";
import { createHeader } from "../../services/UtilityServices";
import { API_CALLS } from "../../utils/api_calls";
import { IAnswer, IQuestion } from "../../utils/Models";
import { CashedItem } from "../../utils/Enums";

export const services = {

    getAnswer(answerId: string) {
        let url = API_CALLS.answers + answerId;

        return httpService.get(url);
    },

    updateQuestion(question: IQuestion, token: string) {
        let url = API_CALLS.updateQuestion;
        let headers = createHeader(token);

        return httpService.put(url, question, headers);

    },

    deleteQuestion(id: string, token: string) {
        let url = API_CALLS.deleteQuestion + id;
        let headers = createHeader(token);

        return httpService.deleteEntity(url, headers);

    },
    getAnswers(questionId: string) {
        let url = API_CALLS.answerList + questionId;
        let headers = createHeader("");

        return httpService.get(url,headers);

    },
    postAnswer(data: object, token: string) {
        let url = API_CALLS.answers;
        let headers = createHeader(token);

        console.log('posing answer');

        return httpService.post(url, data, headers);
    },
    updateAnswer(data: IAnswer, token: string) {
        let url = API_CALLS.answers;
        let headers = createHeader(token);

        console.log('posing answer');

        return httpService.put(url, data, headers);

    },
    deleteAnswer(id: string, token: string) {
        let url = API_CALLS.answers + id;
        let headers = createHeader(token);

        return  httpService.deleteEntity(url, headers);
    },
    countView(id: string) {
        let url = API_CALLS.viewQuestionCount + id;
        console.log('counting view:');

        let data = localStorage.getItem(CashedItem.VIEWS);
        if (!data) {
            localStorage.setItem(CashedItem.VIEWS, JSON.stringify([]));
            data = "[]";
        };

        let views: string[] = JSON.parse(data);
        if (views.indexOf(id) != -1) return;

        return httpService.put(url, {});
    }
}


