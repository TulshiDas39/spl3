import React, { Component } from "react";
import "./styles/user.css";

export class User extends Component<any, any>{
    public render() {
        return (
            <div id="user_of_question" className="user_of_discuss">
                <span className="questionTime">১ ঘন্টা আগে প্রশ্ন করেছেন</span>
                <div>
                    <img src="res/images/sample.PNG" alt="" />
                    <div>
                        <a className="userName" href="" >tulshi das</a>
                        <div className="rating_of_user_of_discuss">
                            <span>4958</span>
                            <span className="fa fa-certificate"></span>
                            <span>৮</span>
                            <span className="fa fa-certificate"></span>
                            <span>23</span>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}