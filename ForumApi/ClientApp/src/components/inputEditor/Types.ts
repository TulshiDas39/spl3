import { ActionType } from "../answer/Types";

export interface editorProps {
    questionId: string;
    onPost(value:string): void;
    innterHtml:string;
    actionType:ActionType;
}

