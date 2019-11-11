import React, { Component } from "react";
import "./styles/commentBox.css";
import { ICommentBoxProp } from "./Types";


export class CommentBox extends Component<ICommentBoxProp, any>{

    private initialValue = "";
    private value = "";
    constructor(props: ICommentBoxProp) {
        super(props);
        if (props.text) {
            this.initialValue = props.text;
            this.value = props.text;
        }
    }

    private onChange(value: string) {
        this.value = value;
    }


    render() {
        return (
            <div className="commentBox">
                <input type="text" defaultValue={this.initialValue} onChange={e => this.onChange(e.target.value)} />
                <span className="commentActions">
                    <span className="commentActionItem" onClick={() => this.props.onSave(this.value)}>নিশ্চিত করুন</span>
                    <span className="commentActionItem cancellComment" onClick={this.props.onCancell}>বাতিল</span>
                </span>

            </div>
        );
    }
}