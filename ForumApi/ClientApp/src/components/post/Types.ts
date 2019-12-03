import { IQuestion, IAnswer } from "../../utils/Models";
import { PostType } from "../../utils/Enums";

export interface PostProps {
    data: IQuestion | IAnswer;
    onEdit(): void;
    onDelete(): void;
    type:PostType;
    onAccept?(status:boolean):void;
    questionAcceptee?:boolean;
    questionData?:IQuestion;
}