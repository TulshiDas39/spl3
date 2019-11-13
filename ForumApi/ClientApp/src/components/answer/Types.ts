import { IQuestion, IAnswer } from "../../utils/Models";
import { RouteProps } from "react-router";
import { PostType } from "../../utils/Enums";

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

export interface PostProps {
    data: IQuestion | IAnswer;
    onEdit(): void;
    onDelete(): void;
}

export enum ActionType {
    Edit, Delete, None
}

export enum ActionEntity {
    Answer, Question, None
}
