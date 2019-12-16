import React, { Component } from "react";
import { ICommentProps } from "./Types";
import { CommentBox } from "./CommentBox";
import { Auth0Context } from "../../utils/Contexts";
import styles from "./styles/comment.module.scss";
import { IComment, IUser } from "../../utils/Models";
import { IAuth0Context } from "../../utils/Structures";
import { commentService } from "./CommentService";
import { utilityService } from "../../services/UtilityService";
import { PostType } from "../../utils/Enums";
import { Link } from "react-router-dom";
import { rootService } from "../../services/RootService";
import { postService } from "../post/PostService";
import { VoteStatus } from "../../utils/Constants";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";

interface state {
    isEditing: boolean;
}

export class Comment extends Component<ICommentProps, state>{

    static contextType = Auth0Context;
    private voteStatus?:boolean;
    private userOfComment = {} as IUser;
    private comment = {} as IComment;

    constructor(props: ICommentProps) {
        super(props);
        this.state = { isEditing: false };
        this.comment = props.data;
    }

    componentDidMount() {
        if (this.context.isAuthenticated) this.updateVoteStatus();
        this.showUserOfComment();
    }

    private updateCommentInfo(){
        httpService.get(API_CALLS.comment+this.comment.id).then(data=>{
            this.comment = data;
            this.setState(this.state);
        })
    }

    private updateComponent() {
        this.setState(this.state);
    }

    private showUserOfComment() {
        rootService.getUser(this.comment.userId).then(data => {
            this.userOfComment = data;
            this.updateComponent();
        })
    }

    private async updateVoteStatus() {
        postService.getVoteStatus(this.comment.id, this.context.user.sub, PostType.COMMENT, this.context.token).then(data => {
            this.voteStatus = data;
            this.updateComponent();
        });
    }

    private editComment(): void {
        this.setState({ isEditing: true });
    }

    async onEditSave(text: string) {
        let comment = this.comment;
        comment.text = text;
        commentService.updateComment(comment, this.context.token).then(() => {
            this.setState({ isEditing: false });
        }, err => {
            console.error(err);
        });
    }

    onCancell() {
        this.setState({ isEditing: false });
    }

    private async giveRate(type: boolean) {
        let context = this.context as IAuth0Context;
        if (!context.isAuthenticated) return;
        if (this.voteStatus === type) return;
        commentService.postRate(context.token, context.user.sub, this.comment.id, type).then(data => {
            this.voteStatus = type;
            this.updateCommentInfo();
        });

    }

    render() {
        if (this.state.isEditing)
            return (
                <CommentBox text={this.comment.text} onSave={this.onEditSave.bind(this)} onCancell={this.onCancell.bind(this)} />
            );

        let upVoteBtnColor = 'black';
        let downVoteBtnColor = 'black';

        if (this.voteStatus) upVoteBtnColor = 'blue';
        if (this.voteStatus === false) downVoteBtnColor = 'blue';

        return (
            <span key={this.comment.id} className={styles.user_comment}>
                {this.getRatings()}
                <span className={styles.user_comment_vote}>
                    <span className={styles.useful_comment}>
                        <span className={styles.vote_count}></span>
                        <span className={"fa fa-sort-asc "+ styles.vote_icon} style={{ color: upVoteBtnColor }} title="উপকারী কমেন্ট" onClick={() => this.giveRate(VoteStatus.UPVOTED)}></span>
                    </span>
                    <span className={styles.flaged_comment}>
                        <span className={styles.vote_count}></span>
                        <span className={"fa fa-fire "+styles.vote_icon} title="সমস্যামুলক" style={{ color: downVoteBtnColor }} onClick={() => this.giveRate(VoteStatus.DOWNVOTED)}></span>
                    </span>

                </span>
                <span className={styles.commentDiv}>
                    <span className={styles.user_comment_text}>{this.comment.text}</span>
                    {
                        this.getCommentFooter()
                    }

                </span>
            </span>
        )
    }

    private getRatings() {
        if (this.comment.ratings !== 0) return <span className={styles.comment_reaction}>{utilityService.convertToBengaliText(this.comment.ratings)}</span>;
    }

    private getCommentFooter() {
        return (<span className={styles.commentFooter}>
            {this.getCommentActions()}
            <Link to={"/profile/"+this.userOfComment.id} style={{ textDecoration: 'none' ,marginLeft:'auto'}}>{"- "+this.userOfComment.name}</Link>
        </span>);
    }

    private getCommentActions() {
        let context = this.context as IAuth0Context;
        if (context.isAuthenticated) {
            if (context.user.sub === this.comment.userId) return (
                <span className={styles.commentOptions}>
                    <span className={styles.user_comment_edit} onClick={() => this.editComment()}>সম্পাদন</span>
                    <span className={styles.user_comment_delete} onClick={this.props.onDelete}>মুছুন</span>
                </span>
            )
        }
    }


}