import { PostType } from "./Enums";

export interface IQuestion {
    id: string;
    userId: string;
    title: string;
    description: string;
    tags: string;
    ratings: number;
    datetime: number;
    views: number;
    isAccepted: boolean;
}

export interface IAnswer {
    id: string;
    userId: string;
    questionId: string;
    description: string;
    ratings: number;
    datetime: number;
    isAccepted:boolean;
}

export interface IUser {
    id: string;
    userId: string;
    name: string;
    tags: string;
    reputation: number;
    location: string;
    image:string;
}

export interface IComment {
    id: string;
    userId: string;
    target: string;
    targetId: string;
    text: string;
    ratings: number;
    datetime: number;
}

export interface IVote {
    id:string;
    userId:string;
    isUpvote:boolean;
    postId:string;
    postType:PostType;
} 

export interface ITag{
    id:string;
    name:string;
    description:string;
    users:number;
}