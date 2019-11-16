import { IQuestion, IAnswer } from "../../utils/Models";

export interface PostProps {
    data: IQuestion | IAnswer;
    onEdit(): void;
    onDelete(): void;
}