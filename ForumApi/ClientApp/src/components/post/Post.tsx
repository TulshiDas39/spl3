import React, { Component } from "react";
import { User } from "../answer/subComponents/User";
import "./post.css";
import {IAnswer, IQuestion } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { ConfirmationDialog } from "../popups/ConfirmationDialog";
import { PostType } from "../../utils/Enums";
import { CommentList } from "../commentList/CommentList";
import { PostProps } from "./Types";
import { Vote } from "../vote/Vote";
import { rootService } from "../../services/RootService";


export class Post extends Component<PostProps, any>{

    static contextType = Auth0Context;
    private postType = PostType.QUESTION;
    private post:IAnswer | IQuestion;

    constructor(props:PostProps){
        super(props);
        this.post = props.data;
        this. init();
    }

    init() {
        if((this.props.data as IAnswer).questionId) this.postType = PostType.ANSWER;
    }

    private updateComponent(){
        this.setState(this.state);
    }

    private fetchUpdates(){
        if(this.postType == PostType.QUESTION) {
            rootService.getQuestion(this.props.data.id).then(data=>{
                this.post = data;
                this.updateComponent();
            }, err=>{
                console.error(err);
            });
        }
    }

    public render() {
        return (
            <div id="postDiv">
                <Vote ratings={this.props.data.ratings} postId = {this.props.data.id} postType = {this.postType} onVote={this.fetchUpdates.bind(this)}/>
                <div id="question_description">
                    <span className="question_description_text" dangerouslySetInnerHTML={{ __html: this.props.data.description }}></span>
                    {this.getEdit_DeleteOptions()}

                    <User userId = {this.props.data.userId} postTime = {this.props.data.datetime}/>

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