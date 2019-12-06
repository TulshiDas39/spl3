import React, { Component } from "react";
import styles from "./styles/user_info.module.scss";

export class UserInfo extends Component<any, any> {


    render() {
        return ([
            <div key="userInfoContainer" className="user-info-container">
                <div className="user-info-div">
                    <img className="user-pic" src="res/images/meanduddipda.jpg" alt="" />

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
            </div>,

            <div key="topTags" className="top-tags">
                <span className="tag-head">শীর্ষ ট্যাগসমুহ(১,২০৪)</span>
                <div className="first-line-tag tag-line">
                    <span className="main-tag-name">Docker</span>
                    <span className="fa fa-certificate main-tag-icon"></span>
                    <span className="score">
                        <span>স্কোর</span>
                        <span style={{ fontSize: '1.5em' }}>১০০২৩</span>
                    </span>
                    <span className="posts">
                        <span>পোস্ট</span>
                        <span style={{ fontSize: '1.5em' }}>১০০</span>
                    </span>
                    <span className="post-percent">
                        <span>পোস্ট%</span>
                        <span style={{ fontSize: '1.5em' }}>১০%</span>
                    </span>
                </div>

                <div className="second-line-tag tag-line">
                    <div style={{ flexGrow: 1, marginRight: '5px' }}>
                        <span style={{ padding: '5px 10px', background: '#E1ECF4' }}>Python</span>
                        <span className="fa fa-certificate second-line-icon"></span>
                        <span style={{ marginLeft: 'auto' }}>
                            <span>স্কোর</span>
                            <span style={{ fontSize: '1.3em' }}>২০৮</span>
                        </span>
                        <span style={{ marginLeft: '10px' }}>
                            <span>পোস্ট</span>
                            <span style={{ fontSize: '1.3em' }}>২৩৪</span>
                        </span>
                    </div>
                    <div style={{ flexGrow: 1, marginLeft: '5px' }}>
                        <span style={{ padding: '5px 10px', background: '#E1ECF4' }}>Python</span>
                        <span className="fa fa-certificate second-line-icon"></span>
                        <span style={{ marginLeft: 'auto' }}>
                            <span>স্কোর</span>
                            <span style={{ fontSize: '1.3em' }}>২০৮</span>
                        </span>
                        <span style={{ marginLeft: '10px' }}>
                            <span>পোস্ট</span>
                            <span style={{ fontSize: '1.3em' }}>২৩৪</span>
                        </span>
                    </div>
                </div>

                <div className="third-line-tag tag-line">
                    <div
                        style={{ flexGrow: 1, marginRight: '5px', display: 'flex', alignItems: 'center', background: '#FAFAFB' }}>
                        <span style={{ padding: '5px 10px', background: '#E1ECF4' }}>Python</span>
                        <span className="fa fa-certificate second-line-icon" style={{ color: 'silver', marginLeft: '5px' }}></span>
                        <span style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
                            <span>
                                <span>স্কোর</span>
                                <span style={{ fontSize: '1.1em' }}>২০৮</span>
                            </span>
                            <span>
                                <span>পোস্ট</span>
                                <span style={{ fontSize: '1.1em' }}>২৩৪</span>
                            </span>
                        </span>

                    </div>

                    <div
                        style={{ flexGrow: 1, marginRight: '5px', display: 'flex', alignItems: 'center', background: '#FAFAFB' }}>
                        <span style={{ padding: '5px 10px', background: '#E1ECF4' }}>Python</span>
                        <span className="fa fa-certificate second-line-icon" style={{ color: 'silver', marginLeft: '5px' }}></span>
                        <span style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
                            <span>
                                <span>স্কোর</span>
                                <span style={{ fontSize: '1.1em' }}>২০৮</span>
                            </span>
                            <span>
                                <span>পোস্ট</span>
                                <span style={{ fontSize: '1.1em' }}>২৩৪</span>
                            </span>
                        </span>

                    </div>

                    <div
                        style={{ flexGrow: 1, marginRight: '5px', display: 'flex', alignItems: 'center', background: '#FAFAFB' }}>
                        <span style={{ padding: '5px 10px', background: '#E1ECF4' }}>Python</span>
                        <span className="fa fa-certificate second-line-icon" style={{ color: 'silver', marginLeft: '5px' }}></span>
                        <span style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
                            <span>
                                <span>স্কোর</span>
                                <span style={{ fontSize: '1.1em' }}>২০৮</span>
                            </span>
                            <span>
                                <span>পোস্ট</span>
                                <span style={{ fontSize: '1.1em' }}>২৩৪</span>
                            </span>
                        </span>

                    </div>
                </div>

            </div>,
             <div key="topPosts" className="top-posts">
                 <span className="post-head">
                    <span style={{fontWeight: 'bold'}}>শীর্ষ পোস্টসমুহ (১০২৪)</span>
                    <span style={{padding:'0 6px', marginLeft: 'auto', borderBottom: '1px solid #F48024'}}>সব</span>
                    <span style={{padding:'0 6px'}}>উত্তর</span>
                    <span style={{padding:'0 6px',marginRight: '20px'}}>প্রশ্ন</span>
                </span>

                <div className="topPostItem">
                    <span className="fa fa-question-circle-o"></span>
                    <span style={{padding: '3px 5px', background:'green',margin: '0 6px',color:'white'}}>১৪২</span>
                    <span>একটা অঙ্ক পারতেছিনা, কেউ সাহায্য করেন</span>
                    <span style={{marginLeft: 'auto'}}>সেপ্টেম্বার ১৭ '১৮</span>
                </div>
                <div className="topPostItem">
                    <span className="fa fa-question-circle-o"></span>
                    <span style={{padding: '3px 5px', background:'green',margin: '0 6px',color:'white'}}>১৪২</span>
                    <span>একটা অঙ্ক পারতেছিনা, কেউ সাহায্য করেন</span>
                    <span style={{marginLeft: 'auto'}}>সেপ্টেম্বার ১৭ '১৮</span>
                </div>
             </div>
        ])
    }
}