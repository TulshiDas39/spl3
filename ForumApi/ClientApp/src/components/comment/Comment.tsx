import React, { Component } from "react";
import { ICommentProps } from "./Types";
import { CommentBox } from "./CommentBox";
import { Auth0Context } from "../../utils/Contexts";
import "./styles/comment.css";
import { updateComment } from "../commentList/Services";
import { IComment } from "../../utils/Models";
import { IAuth0Context } from "../../utils/Structures";

interface state {
    isEditing: boolean;
}

export class Comment extends Component<ICommentProps, state>{

    static contextType = Auth0Context;
    private editingComment = {} as IComment;

    constructor(props: ICommentProps) {
        super(props);
        this.state = { isEditing: false };
    }


    editComment(): void {
        this.setState({ isEditing: true })
    }

    async onEditSave(text: string) {
        let token = await this.context.getTokenSilently();
        let comment = this.props.data;
        comment.text = text;
        updateComment(comment, token).then(() => {
            this.setState({ isEditing: false });
        }, err => {
            console.error(err);
        });
    }

    onCancell() {
        this.setState({ isEditing: false });
    }

    render() {
        if (this.state.isEditing)
            return (
                <CommentBox text={this.props.data.text} onSave={this.onEditSave.bind(this)} onCancell={this.onCancell.bind(this)} />
            );

        return (
            <span key={this.props.data.id} className="user-comment">
                <span className="user-comment-vote">
                    <span className="useful-comment">
                        <span className="vote-count"></span>
                        <span className="fa fa-sort-asc vote-icon" title="উপকারী কমেন্ট"></span>
                    </span>
                    <span className="flaged-comment">
                        <span className="vote-count"></span>
                        <span className="fa fa-fire vote-icon" title="সমস্যামুলক"></span>
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