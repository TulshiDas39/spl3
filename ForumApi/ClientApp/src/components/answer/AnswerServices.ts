import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { IAnswer, IQuestion } from "../../utils/Models";
import { CashedItem } from "../../utils/Enums";
import { utilityService } from "../../services/UtilityService";

export const answerService = {

    getAnswer(answerId: string) {
        let url = API_CALLS.answers + answerId;

        return httpService.get(url);
    },

    updateQuestion(question: IQuestion, token: string) {
        let url = API_CALLS.updateQuestion;
        let headers =utilityService.createHeader(token);

        return httpService.put(url, question, headers);
    },

    deleteQuestion(id: string, token: string) {
        let url = API_CALLS.deleteQuestion + id;
        let headers = utilityService.createHeader(token);

        return httpService.deleteEntity(url, headers);

    },
    getAnswers(questionId: string) {
        let url = API_CALLS.answerList + questionId;
        let headers = utilityService.createHeader("");

        return httpService.get(url,headers);

    },
    postAnswer(data: object, token: string) {
        let url = API_CALLS.answers;
        let headers = utilityService.createHeader(token);

        console.log('posing answer');

        return httpService.post(url, data, headers);
    },
    updateAnswer(data: IAnswer, token: string) {
        let url = API_CALLS.answers;
        let headers = utilityService.createHeader(token);

        console.log('posing answer');

        return httpService.put(url, data, headers);

    },
    deleteAnswer(id: string, token: string) {
        let url = API_CALLS.answers + id;
        let headers = utilityService.createHeader(token);

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
        if (views.indexOf(id) !== -1) return;

        return httpService.put(url, {});
    },
    markQuestionAsAccepted(question:IQuestion, token:string){
        let headers = utilityService.createHeader(token);
        return httpService.put(API_CALLS.questions,question,headers);
    }
}


