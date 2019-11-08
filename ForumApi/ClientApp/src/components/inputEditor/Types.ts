import { ActionType } from "../answer/Types";

export interface editorProps {
    onPost(value:string): void;
    innterHtml:string;
    actionType:ActionType;
}

