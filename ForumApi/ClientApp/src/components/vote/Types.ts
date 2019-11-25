
export interface IVoteProps{
    ratings:number;
    voteStatus?:boolean;
    vote(vote:boolean):void;
}