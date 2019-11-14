import React, { Component } from "react";
import { User } from "./User";
import "./styles/post.css";
import {IAnswer } from "../../../utils/Models";
import { Auth0Context } from "../../../utils/Contexts";
import { IAuth0Context } from "../../../utils/Structures";
import { ConfirmationDialog } from "../../popups/ConfirmationDialog";
import { PostType } from "../../../utils/Enums";
import { CommentList } from "../../commentList/CommentList";
import { Utility } from "../../../utils/Utility";
import { PostProps } from "../Types";
import { Vote } from "../../vote/Vote";


export class Post extends Component<PostProps, any>{

    static contextType = Auth0Context;
    private postType = PostType.QUESTION;

    constructor(props:PostProps){
        super(props);
        this. init();
    }

    init() {
        if((this.props.data as IAnswer).questionId) this.postType = PostType.ANSWER;
    }

    public render() {
        return (
            <div id="postDiv">
                <Vote ratings={12} postId = {this.props.data.id} postType = {this.postType}/>
                <div id="question_description">
                    <span className="question_description_text" dangerouslySetInnerHTML={{ __html: this.props.data.description }}></span>
                    {this.getEdit_DeleteOptions()}

                    <User />

                    <CommentList postId= {this.props.data.id} postType = {this.postType} />
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