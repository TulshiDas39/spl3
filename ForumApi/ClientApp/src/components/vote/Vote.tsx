import React, { Component } from "react";
import { utilityService } from "../../utils/Utility";
import { voteProps } from "./Types";
import "./vote.css";
import { IVote } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { voteService } from "./VoteService";
import { VoteStatus } from "../../utils/Enums";

interface state {
    isLoading:boolean;
}

export class Vote extends Component<voteProps, state>{

    static contextType = Auth0Context;
    private ratings:number;
    private voteStatus = VoteStatus.NOTVOTED;

    constructor(props: voteProps) {
        super(props);
        this.state = {isLoading:true};
        this.ratings = props.ratings;
    }

    componentDidMount(){
        this.init();
    }

    private async init(){

        let context = this.context as IAuth0Context;
        if(!context.isAuthenticated) return;

        let token = await context.getTokenSilently();

        voteService.getVoteStatus(this.props.postId, this.context.user.sub, this.props.postType,token).then(data=>{
            console.log('ata:');
            console.log(data);
            this.voteStatus = data;
            this.setState({isLoading:false});

        });
    }

    private updateComponent(){
        this.setState(this.state);
    }

    private async vote(type:VoteStatus) {
        
        let context = this.context as IAuth0Context;

        if(!context.isAuthenticated) return;
        let token = await context.getTokenSilently();
        if(type == this.voteStatus) return;

        let vote: IVote  = {
            id: undefined as any,
            postId: this.props.postId,
            postType: this.props.postType,
            userId: context.user.sub,
            isUpvote: type == VoteStatus.UPVOTED?true:false
        }

        voteService.postVote(token,vote).then((data)=>{

            if(this.voteStatus == VoteStatus.NOTVOTED){
                type == VoteStatus.DOWNVOTED? this.ratings--:this.ratings++;
            }
            else this.voteStatus == VoteStatus.UPVOTED?this.ratings -=2:this.ratings+=2;
            this.voteStatus = type;
            this.updateComponent();
        });
    }

    render() {
        if(this.state.isLoading) return <span></span>;

        let upVoteBtnColor = 'black';
        let downVoteBtnColor = 'black';
        
        if(this.voteStatus == VoteStatus.UPVOTED) upVoteBtnColor = 'blue';
        else if(this.voteStatus == VoteStatus.DOWNVOTED) downVoteBtnColor = 'blue';

        return (
            <div id="question_vote" className="vote_system">
                <span className="fa fa-sort-asc vote_icon" style={{color:upVoteBtnColor}} onClick={()=> this.vote(VoteStatus.UPVOTED)}></span>
                <span>{utilityService.convertToBengaliText(this.ratings)}</span>
                <span className="fa fa-sort-desc vote_icon" style={{color:downVoteBtnColor}} onClick={()=> this.vote(VoteStatus.DOWNVOTED)}></span>
            </div>

        );
    }
}