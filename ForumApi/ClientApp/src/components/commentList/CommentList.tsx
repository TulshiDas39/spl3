import React, { Component } from "react";
import { IComment } from "../../utils/Models";
import { ICommentsProps } from "./Types";
import "./comments.css";
import { Comment } from "../comment/Comment";

interface state {
    isLoading: boolean;
}

export class Comments extends React.Component<ICommentsProps, state>{
    private comments: IComment[] = [{dateTime:new Date().getTime(),id:"231341241234",ratings:0,target:"Q",targetId:"1238383378287483",text:"hellow orld",userId:"1431341kfdasfjasdfasdf"}];

    constructor(props: any) {
        super(props);
        this.state = { isLoading: false };
    }

    componentDidMount() {
        this.fetchComments();
    }

    private fetchComments() {
        //throw new Error("Method not implemented.");
    }

    render() {
        
        return (
            <div className="comments">
                {this.comments.map((item,index)=> <Comment key={"commentItem_"+item.id} data={item}/>)}
                <span className="make-comment">মন্তব্য করুন</span>
            </div>
        )
    }


}