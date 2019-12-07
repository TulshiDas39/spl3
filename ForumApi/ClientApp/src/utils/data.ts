import { ITagInfo } from "./Structures";
import { IQuestion } from "./Models";

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const StatusData = {
    popularTags:[] as ITagInfo[],
    popularQuestionsThisWeek:[] as IQuestion[]
}
