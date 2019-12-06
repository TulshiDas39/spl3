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

interface state {
    isEditing: boolean;
}

export class Comment extends Component<ICommentProps, state>{

    static contextType = Auth0Context;
    private editingComment = {} as IComment;
    private ratings: number = 0;
    private voteStatus?:boolean;
    private userOfComment = {} as IUser;

    constructor(props: ICommentProps) {
        super(props);
        this.state = { isEditing: false };
        this.ratings = props.data.ratings;
    }

    componentDidMount() {
        if (this.context.isAuthenticated) this.updateVoteStatus();
        this.showUserOfComment();
    }

    private updateComponent() {
        this.setState(this.state);
    }

    private showUserOfComment() {
        rootService.getUser(this.props.data.userId).then(data => {
            this.userOfComment = data;
            this.updateComponent();
        })
    }

    private async updateVoteStatus() {
        postService.getVoteStatus(this.props.data.id, this.context.user.sub, PostType.COMMENT, this.context.token).then(data => {
            this.voteStatus = data;
            this.updateComponent();
        });
    }

    private editComment(): void {
        this.setState({ isEditing: true });
    }

    async onEditSave(text: string) {
        let comment = this.props.data;
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
        commentService.postRate(context.token, context.user.sub, this.props.data.id, type).then(data => {
            if (this.voteStatus === undefined) {
                type === VoteStatus.DOWNVOTED ? this.ratings-- : this.ratings++;
            }
            else this.voteStatus === VoteStatus.DOWNVOTED ? this.ratings -= 2 : this.ratings += 2;
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

        if (this.voteStatus) upVoteBtnColor = 'blue';
        if (this.voteStatus === false) downVoteBtnColor = 'blue';

        return (
            <span key={this.props.data.id} className={styles.user_comment}>
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
                    <span className={styles.user_comment_text}>{this.props.data.text}</span>
                    {
                        this.getCommentFooter()
                    }

                </span>
            </span>
        )
    }

    private getRatings() {
        if (this.ratings !== 0) return <span className={styles.comment_reaction}>{utilityService.convertToBengaliText(this.ratings)}</span>;
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
            if (context.user.sub === this.props.data.userId) return (
                <span className={styles.commentOptions}>
                    <span className={styles.user_comment_edit} onClick={() => this.editComment()}>সম্পাদন</span>
                    <span className={styles.user_comment_delete} onClick={this.props.onDelete}>মুছুন</span>
                </span>
            )
        }
    }


}