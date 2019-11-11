import { IComment } from "../../utils/Models";

export interface ICommentProps{
    data:IComment;
}

export interface ICommentBoxProp{
    text?:string;
    onSave(text:string):void;
    onCancell():void;
}