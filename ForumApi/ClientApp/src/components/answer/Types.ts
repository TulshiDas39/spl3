import { IQuestion } from "../../utils/Models";
import { RouteProps } from "react-router";

export interface discussionProps{
    questionData: IQuestion;
}

interface editorProps{
    postType:postType;

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