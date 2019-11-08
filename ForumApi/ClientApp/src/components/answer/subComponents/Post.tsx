import React, { Component } from "react";
import { User } from "./User";
import "./styles/post.css";
import { Comment } from "./Comment";
import { IQuestion, IAnswer } from "../../../utils/Models";
import { Auth0Context } from "../../../utils/Contexts";
import { IAuth0Context } from "../../../utils/Structures";

interface props {
    data: IQuestion | IAnswer;
    onEdit():void;
    onDelete():void;
}

export class Post extends Component<props, any>{
    static contextType = Auth0Context;

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

                    <Comment />
                </div>
            </div>
        )
    }

    private getEdit_DeleteOptions() {
        if (this.isEditable()) {
            return (<p className="edit_delete_options">
                <span className="edit_option" onClick={this.props.onEdit}>সম্পাদন করুন </span>
                <span className="delete_option" onClick={this.props.onDelete}>মুছুন</span>
            </p>
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