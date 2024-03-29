import { IAnswer, IQuestion } from "../../utils/Models";
import { PostType } from "../../utils/Enums";

export interface ICommentsProps{
    postId:string;
    postType:PostType;
}

export interface ICashedComment{
    targetId?:string;
    text?:string;
}