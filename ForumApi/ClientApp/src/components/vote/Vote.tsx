import React, { Component } from "react";
import { Utility } from "../../utils/Utility";
import { voteProps } from "./Types";
import "./vote.css";
import { IVote } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { postVote } from "./Service";

interface state {
    isLoading:boolean;
}

export class Vote extends Component<voteProps, state>{

    static contextType = Auth0Context;
    private ratings:number;

    constructor(props: voteProps) {
        super(props);
        this.state = {isLoading:false};
        this.ratings = props.ratings;

    }

    private updateComponent(){
        this.setState(this.state);
    }

    private async vote(isUpvote:boolean) {
        let vote: IVote;
        let context = this.context as IAuth0Context;
        let token = await context.getTokenSilently();

        vote = {
            id: undefined as any,
            postId: this.props.postId,
            postType: this.props.postType,
            userId: context.user.sub,
            isUpvote: isUpvote
        }

        postVote(token,vote).then(()=>{
            if(isUpvote) this.ratings++;
            else this.ratings--;
            this.updateComponent();
        });
    }

    render() {
        return (
            <div id="question_vote" className="vote_system">
                <span className="fa fa-sort-asc vote_icon" onClick={()=> this.vote(true)}></span>
                <span>{Utility.convertToBengaliText(this.ratings)}</span>
                <span className="fa fa-sort-desc vote_icon" onClick={()=> this.vote(false)}></span>
            </div>

        );
    }
}