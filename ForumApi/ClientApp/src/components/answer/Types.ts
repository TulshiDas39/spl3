import { IQuestion, IAnswer } from "../../utils/Models";
import { RouteProps } from "react-router";
import { PostType } from "../../utils/Enums";
import { IUserCredential } from "../../utils/Structures";

export interface discussionProps {
    questionData: IQuestion;
    onDeleteQuestion(): void;
}

export interface editorProps {
    postType: PostType;
}

export interface AnswerProps {
    history: string[];
    match: {
        params: {
            handle: string;
        }
    }
}

export enum ActionType {
    Edit, Delete, None
}

export enum ActionEntity {
    Answer, Question, None
}

export interface UserProps{
    userId:string;
    postTime:number;
}