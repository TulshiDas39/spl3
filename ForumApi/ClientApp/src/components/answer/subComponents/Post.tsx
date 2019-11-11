import React, { Component } from "react";
import { User } from "./User";
import "./styles/post.css";
import { IQuestion, IAnswer } from "../../../utils/Models";
import { Auth0Context } from "../../../utils/Contexts";
import { IAuth0Context } from "../../../utils/Structures";
import { ConfirmationDialog } from "../../popups/ConfirmationDialog";
import { PostType } from "../../../utils/Enums";
import { Comments } from "../../commentList/CommentList";
import { ICommentsProps } from "../../commentList/Types";

interface props {
    data: IQuestion | IAnswer;
    onEdit(): void;
    onDelete(): void;
}

export class Post extends Component<props, any>{

    static contextType = Auth0Context;
    private postType = PostType.QUESTION;

    constructor(props:props){
        super(props);
        this. init();
    }

    init() {
        if((this.props.data as IAnswer).questionId) this.postType = PostType.ANSWER;
    }

    public render() {
        return (
            <div id="postDiv">
                <div id="question_vote" className="vote_system">
                    <span className="fa fa-sort-asc vote_icon"></span>
                    <span>{this.props.data.ratings}</span>
                    <span className="fa fa-sort-desc vote_icon"></span>
                </div>
                <div id="question_description">
                    <span className="question_description_text" dangerouslySetInnerHTML={{ __html: this.props.data.description }}></span>
                    {this.getEdit_DeleteOptions()}

                    <User />

                    <Comments postId= {this.props.data.id} postType = {this.postType} />
                </div>
            </div>
        )
    }

    private getEdit_DeleteOptions() {
        if (this.isEditable()) {
            return (<div className="edit_delete_options">
                <span className="edit_option" onClick={this.props.onEdit}>সম্পাদন করুন </span>
                <ConfirmationDialog title="Do you want to delete" onConfirm={this.props.onDelete} onClose={() => { console.log("closed") }}>
                    <span className="delete_option">মুছুন</span>
                </ConfirmationDialog>

            </div>
            );
        }
    }

    private isEditable() {
        let context = this.context as IAuth0Context;
        if (context.isAuthenticated) {
            if (context.user.sub == this.props.data.userId) return true;
            return false;
        }

        return false;
    }
}