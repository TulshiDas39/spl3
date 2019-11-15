import React, { Component } from "react";
import { utilityService } from "../../utils/Utility";
import { voteProps } from "./Types";
import "./vote.css";
import { IVote } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { service } from "./Service";

interface state {
    isLoading:boolean;
}

export class Vote extends Component<voteProps, state>{


    static contextType = Auth0Context;
    private ratings:number;
    private isUpvoted?:boolean;

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

        service.getVoteStatus(this.props.postId, this.context.user.sub, this.props.postType,token).then(data=>{
            console.log('ata:');
            console.log(data);
            if(data.id) this.isUpvoted = data.isUpvote;
            this.setState({isLoading:false});
        });
    }

    private updateComponent(){
        this.setState(this.state);
    }

    private async vote(isUpvote:boolean) {
        let vote: IVote;
        let context = this.context as IAuth0Context;

        if(!context.isAuthenticated) return;

        let token = await context.getTokenSilently();

        if(this.isUpvoted && isUpvote) return;
        if(this.isUpvoted == false && isUpvote == false) return;

        vote = {
            id: undefined as any,
            postId: this.props.postId,
            postType: this.props.postType,
            userId: context.user.sub,
            isUpvote: isUpvote
        }

        service.postVote(token,vote).then((data)=>{
            if(isUpvote){
                if( this.isUpvoted == false) this.ratings+=2;
                else this.ratings++;
            }
            else{
                if(this.isUpvoted) this.ratings-=2;
                else this.ratings--;
            } 
            this.isUpvoted = isUpvote;
            this.updateComponent();
            this.props.onVote();
        });
    }

    render() {
        if(this.state.isLoading) return <span></span>;

        let upVoteBtnColor = 'black';
        let downVoteBtnColor = 'black';
        
        if(this.isUpvoted) upVoteBtnColor = 'blue';
        else if(this.isUpvoted == false){ 
            downVoteBtnColor = 'blue';
        }


        return (
            <div id="question_vote" className="vote_system">
                <span className="fa fa-sort-asc vote_icon" style={{color:upVoteBtnColor}} onClick={()=> this.vote(true)}></span>
                <span>{utilityService.convertToBengaliText(this.ratings)}</span>
                <span className="fa fa-sort-desc vote_icon" style={{color:downVoteBtnColor}} onClick={()=> this.vote(false)}></span>
            </div>

        );
    }
}