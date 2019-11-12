export interface IQuestion {
    id: string;
    userId: string;
    title: string;
    description: string;
    tags: string;
    ratings: number;
    dateTime: number;
    views: number;
    isAccepted: boolean;
}

export interface IAnswer{
    id:string;
    userId:string;
    questionId:string;
    description:string;
    ratings:number;
    datetime:number;
}

export interface IUser{
    id:string;
    userId:string;
    name:string;
    tags:string;
    reputation:string;
    location:string;
}

export interface IComment{
    id:string;
    userId:string;
    target:string;
    targetId:string;
    text:string;
    ratings:number;
    datetime:number;
}