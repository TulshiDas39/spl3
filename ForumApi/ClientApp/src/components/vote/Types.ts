import { PostType } from "../../utils/Enums";

export interface voteProps{
    ratings:number;
    postId:string;
    postType:PostType;
    onVote():void;
}