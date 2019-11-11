import React, { Component } from "react";
import "./styles/comment.css";

export class Comment extends Component<any, any>{

    
    render() {
        return (
            <div className="comments">
                <span className="user-comment">
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
                    <span className="user-comment-text">এটা একটি কমেন্ট, এটা একটি কমেন্ট</span>
                </span>

                <span className="make-comment">মন্তব্য করুন</span>
            </div>
        )
    }
}