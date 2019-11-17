import React, { Component } from "react";
import { ICommentProps } from "./Types";
import { CommentBox } from "./CommentBox";
import { Auth0Context } from "../../utils/Contexts";
import "./styles/comment.css";
import { IComment } from "../../utils/Models";
import { IAuth0Context } from "../../utils/Structures";
import { commentService } from "./CommentService";
import { utilityService } from "../../utils/Utility";
import { voteService } from "../vote/VoteService";
import { PostType, VoteStatus } from "../../utils/Enums";

interface state {
    isEditing: boolean;
    isLoading: boolean;
}

export class Comment extends Component<ICommentProps, state>{

    static contextType = Auth0Context;
    private editingComment = {} as IComment;
    private ratings: number = 0;
    private voteStatus = VoteStatus.NOTVOTED;

    constructor(props: ICommentProps) {
        super(props);
        this.state = { isEditing: false, isLoading: true };
        this.ratings = props.data.ratings;
    }

    componentDidMount() {
        if(this.context.isAuthenticated) this.updateVoteStatus();
    }

    private updateComponent() {
        this.setState(this.state);
    }

    private async updateVoteStatus() {
        let token = await this.context.getTokenSilently();
        voteService.getVoteStatus(this.props.data.id, this.context.user.sub,PostType.COMMENT,token).then(data=>{
            this.voteStatus = data;
            this.updateComponent();
        });
    }

    private editComment(): void {
        this.setState({ isEditing: true });
    }

    async onEditSave(text: string) {
        let token = await this.context.getTokenSilently();
        let comment = this.props.data;
        comment.text = text;
        commentService.updateComment(comment, token).then(() => {
            this.setState({ isEditing: false });
        }, err => {
            console.error(err);
        });
    }

    onCancell() {
        this.setState({ isEditing: false });
    }

    private async giveRate(type: VoteStatus) {
        let context = this.context as IAuth0Context;
        if (!context.isAuthenticated) return;
        if (this.voteStatus == type) return;
        let token = await context.getTokenSilently();
        commentService.postRate(token, context.user.sub, this.props.data.id, type).then(data => { 
            if(this.voteStatus == VoteStatus.NOTVOTED){
                type == VoteStatus.DOWNVOTED? this.ratings--:this.ratings++;
            }
            else this.voteStatus == VoteStatus.UPVOTED?this.ratings -=2:this.ratings+=2;
            this.voteStatus = type;
            this.updateComponent();
        });

    }

    render() {
        if (this.state.isEditing)
            return (
                <CommentBox text={this.props.data.text} onSave={this.onEditSave.bind(this)} onCancell={this.onCancell.bind(this)} />
            );

        let upVoteBtnColor = 'black';
        let downVoteBtnColor = 'black';

        if (this.voteStatus == VoteStatus.UPVOTED) upVoteBtnColor = 'blue';
        if (this.voteStatus == VoteStatus.DOWNVOTED) downVoteBtnColor = 'blue';

        return (
            <span key={this.props.data.id} className="user-comment">
               {this.getRatings()}
                <span className="user-comment-vote">
                    <span className="useful-comment">
                        <span className="vote-count"></span>
                        <span className="fa fa-sort-asc vote-icon" style={{ color: upVoteBtnColor }} title="উপকারী কমেন্ট" onClick={() => this.giveRate(VoteStatus.UPVOTED)}></span>
                    </span>
                    <span className="flaged-comment">
                        <span className="vote-count"></span>
                        <span className="fa fa-fire vote-icon" title="সমস্যামুলক" style={{ color: downVoteBtnColor }} onClick={() => this.giveRate(VoteStatus.DOWNVOTED)}></span>
                    </span>

                </span>
                <span className="commentDiv">
                    <span className="user-comment-text">{this.props.data.text}</span>
                    {
                        this.getCommentActions()
                    }
                </span>
            </span>
        )
    }

    private getRatings(){
        if(this.ratings !=0) return <span className="comment-reaction">{utilityService.convertToBengaliText(this.ratings)}</span>;
    }

    private getCommentActions() {
        let context = this.context as IAuth0Context;
        if (context.isAuthenticated) {
            if (context.user.sub == this.props.data.userId) return (
                <span className="commentOptions">
                    <span className="user-comment-edit" onClick={() => this.editComment()}>সম্পাদন</span>
                    <span className="user-comment-delete" onClick={this.props.onDelete}>মুছুন</span>
                </span>
            )
        }
    }


}