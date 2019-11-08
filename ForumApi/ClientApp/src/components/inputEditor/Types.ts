import { ActionType } from "../answer/Types";

export interface editorProps {
    onPost(value:string):Promise<void>;
    innterHtml:string;
}

