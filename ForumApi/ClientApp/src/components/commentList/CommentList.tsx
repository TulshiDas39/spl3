import React from "react";
import { IComment } from "../../utils/Models";
import { ICommentsProps, ICashedComment } from "./Types";
import styles from "./commentList.module.scss";
import { Comment } from "../comment/Comment";
import { CommentBox } from "../comment/CommentBox";
import { Auth0Context } from "../../utils/Contexts";
import { commentListService } from "./CommentListServices";
import { IAuth0Context } from "../../utils/Structures";
import { CashedItem } from "../../utils/Enums";

interface state {
    isLoading: boolean;
}

export class CommentList extends React.Component<ICommentsProps, state>{
    private comments: IComment[] = [];
    private isCommenting = false;

    static contextType = Auth0Context;
    constructor(props: any) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.fetchComments();
    }

    private fetchComments() {
        commentListService.fetchCommentList(this.props.postId).then(data => {
            this.comments = data;
            this.performCashedActions();
            this.setState({ isLoading: false });
        });
    }

    private performCashedActions() {
        this.checkComment();
    }

    private checkComment() {
        let comment = localStorage.getItem(CashedItem.USER_COMMENT);
        if (comment) {
            let commentJson = JSON.parse(comment) as ICashedComment;
            if (commentJson.targetId === this.props.postId) {
                this.saveComment(commentJson.text as string);
                localStorage.removeItem(CashedItem.USER_COMMENT);
            }
        }
    }



    private updateComponent() {
        this.setState(this.state);
    }

    private comment() {
        this.isCommenting = true;
        this.updateComponent();
    }

    private cancellComment() {
        this.isCommenting = false;
        this.updateComponent();
    }

    private async saveComment(text: string) {
        console.log('saving comment:' + text);
        let context = this.context as IAuth0Context;

        if (!context.isAuthenticated) {
            let data = {
                text: text,
                targetId: this.props.postId
            } as ICashedComment;

            localStorage.setItem(CashedItem.USER_COMMENT, JSON.stringify(data));

            context.loginWithRedirect({ appState: { targetUrl: window.location.pathname } });
            return;
        }

        let comment: IComment;
        comment = {
            id: undefined as any,
            text: text,
            target: this.props.postType,
            targetId: this.props.postId as string,
            userId: this.context.user.sub,
            ratings: 0,
            datetime: new Date().getTime()
        }
        commentListService.postComment(comment, context.token).then(data => {
            this.comments.push(data);
            this.isCommenting = false;
            this.updateComponent();
        }, err => {
            console.error(err);
        });
    }

    async deleteComment(index: number) {
        let context = this.context as IAuth0Context;
        let id = this.comments[index].id;

        commentListService.deleteComment(id, context.token).then(() => {
            this.comments.splice(index, 1);
            this.updateComponent();
        });

    }

    render() {
        if (this.state.isLoading) return <span></span>;
        return (
            <div className={styles.comments}>
                {this.comments.map((item, index) => <Comment key={"commentItem_" + item.id} data={item} onDelete={() => this.deleteComment(index)} />)}
                {this.isCommenting ? <CommentBox onCancell={this.cancellComment.bind(this)} onSave={this.saveComment.bind(this)} text="" /> :
                    <span className={styles.make_comment} onClick={this.comment.bind(this)}>মন্তব্য করুন</span>}
            </div>
        )
    }
}