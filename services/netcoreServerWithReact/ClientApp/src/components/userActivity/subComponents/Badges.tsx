import React, { Component } from "react";
import "./styles/badges.css";


export class Badges extends Component<any, any>{
    public render() {
        return (
            <div className="badges-container" >
            <div className="badge-head">
                <span>বেজসমুহ</span>
            </div>
            <div className="badges">
                <div className="badge-item plutinum-badge">
                    <span>প্লাটিনাম</span>
                    <span className="badge-count">৭</span>
                </div>
                <div className="badge-item gold-badge">
                    <span>সোনা</span>
                    <span className="badge-count">৮</span>
                </div>
                <div className="badge-item silver-badge">
                    <span>রুপা</span>
                    <span className="badge-count">৭১</span>
                </div>
               
            </div>
        </div>
        )
    }
}