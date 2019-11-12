import { IComment } from "../../utils/Models";

export interface ICommentProps{
    data:IComment;
    onDelete():void;
}

export interface ICommentBoxProp{
    text?:string;
    onSave(text:string):void;
    onCancell():void;
}