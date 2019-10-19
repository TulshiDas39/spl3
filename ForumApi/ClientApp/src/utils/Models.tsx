export interface TQuestion {
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

export interface TAnswer{
    id:string;
    userId:string;
    questionId:string;
    description:string;
    ratings:number;
    dateTime:string;
}

export interface TUser{
    id:string;
    authId:string;
    name:string;
    tags:string;
    reputation:string;
    Location:string;
}

export interface TComment{
    id:string;
    userId:string;
    target:string;
    targetId:string;
    text:string;
    Ratings:number;
    dateTime:number;
}