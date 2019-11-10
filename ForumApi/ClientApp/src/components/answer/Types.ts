import { IQuestion } from "../../utils/Models";
import { RouteProps } from "react-router";

export interface discussionProps{
    questionData: IQuestion;
    onDeleteQuestion():void;
}

interface editorProps{
    postType:postType;

}

export interface AnswerProps{
    history:string[];
    match:{
        params:{
            handle:string;
        }
    }
}

export enum ActionType{
    Edit, Delete, None
}

export enum ActionEntity{
    Answer, Question, None
}

export enum postType{
    Question,
    Answer
}