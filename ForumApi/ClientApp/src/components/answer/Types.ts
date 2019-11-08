import { IQuestion } from "../../utils/Models";

export interface discussionProps {
    questionData: IQuestion;
}

interface editorProps{
    postType:postType;

}

export enum ActionType{
    Edit, Delete, None
}

export enum postType{
    Question,
    Answer
}