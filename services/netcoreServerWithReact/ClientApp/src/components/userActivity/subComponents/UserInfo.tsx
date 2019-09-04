import React, { Component } from "react";
import { PUBLIC_URL } from "../../../Varables";

export class UserInfo extends Component<any, any>{
    public render() {
        return (
            <div className="user-info-container">
                <div className="user-info-div">
                    <img className="user-pic" src={PUBLIC_URL+"/res/images/meanduddipda.jpg"} alt="" />

                    <span className="user-reputation">
                        ১০০২৩ সম্মানী
                </span>

                    <div className="user-badges-count">
                        <span className="platinum-count fa fa-certificate" title="প্লাটিনাম">২</span>
                        <span className="gold-count fa fa-certificate" title="সোনা">৬</span>
                        <span className="silver-count fa fa-certificate" title="রুপা">৪০</span>
                    </div>

                </div>

                <div className="user-name-info">
                    <h1 className="user-info-name">তুলসী দাস</h1>
                    <span className="main-info-user">
                        আমি একজন সফটওয়ার ইঞ্জিনিয়ার
                </span>
                </div>

                <div className="about-activity">
                    <div className="answer-question-count">
                        <div className="answer-count">
                            <span className="answer-count-number">
                                ১০০২৩
                        </span>
                            <span className="answer-count-text">
                                উত্তর
                        </span>
                        </div>

                        <div className="question-count">
                            <span className="question-count-number">
                                ১০০২৩
                        </span>
                            <span className="question-count-text">
                                প্রশ্ন
                        </span>
                        </div>

                        <div className="reach-count">
                            <span>~২০০মিলিয়ন</span>
                            <span>মানুষে পৌছানো</span>
                        </div>
                    </div>

                    <div className="membership-info">
                        <span className="fa fa-clock"></span>
                        <span>
                            <span className="fa fa-history"></span>
                            <span> ৪ বছর, ৪ মাস যাবত সদস্য</span>
                        </span>
                        <span>
                            <span className="fa fa-eye"></span>
                            <span>২৩৯৯ প্রোফাইল দেখা</span>
                        </span>
                        <span>
                            <span className="fa fa-clock-o"></span>
                            <span>সর্বশেষ দেখা ৩২ মিনিট পুর্বে</span>
                        </span>

                    </div>
                </div>
            </div>
        )
    }
}