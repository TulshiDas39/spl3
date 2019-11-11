import React,{ Component } from "react";
import { ICommentProps } from "./Types";
import { CommentBox } from "./CommentBox";
import "./styles/comment.css";

interface state {
    isEditing:boolean;
}

export class Comment extends Component<ICommentProps, state>{

    constructor(props: ICommentProps) {
        super(props);
        this.state={isEditing:false};
    }


    editComment(): void {
        
        this.setState({isEditing:true})
    }

    onEditSave(text:string){
        // preprocessing..........
        this.setState({isEditing:false});
    }

    onCancell(){
        this.setState({isEditing:false});
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
                <span className="user-comment-text">এটা একটি এটা একটি কমেন্ট, এটা একটি কমেন্ট এটা একটি কমেন্ট, এটা একটি কমেন্ট কমেন্ট, এটা একটি কমেন্ট এটা একটি কমেন্ট, এটা একটি কমেন্ট এটা একটি কমেন্ট, এটা একটি কমেন্ট
                এটা একটি এটা একটি কমেন্ট, এটা একটি কমেন্ট এটা একটি কমেন্ট, এটা একটি কমেন্ট কমেন্ট, এটা একটি কমেন্ট এটা একটি কমেন্ট, এটা একটি কমেন্ট এটা একটি কমেন্ট, এটা একটি কমেন্ট</span> <br />
                <span className="user-comment-edit" onClick={() => this.editComment()}>সম্পাদন</span>
                <span className="user-comment-delete">মুছুন</span>
            </span>
        )
    }


}