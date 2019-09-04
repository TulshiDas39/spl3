import React, { Component } from "react";
import "./styles/activity.css";
import { Badge, badge } from "./Badge";
import { UserActivity } from "../UserActivity";

export class Activity {
    private component: UserActivity;

    constructor(component: UserActivity) {
        this.component = component;
    }

    public getActivities() {
        return (
            <div style={{ display: this.component.state.display }}>
                {this.getTopBarInfo()}
                {this.getMenuBar()}
                {this.getUserSummery()}
            </div>
        )
    }
    private getUserSummery(): React.ReactNode {
        return (
            <div className="user-summery">
                {this.getFirstLineSummery()}
                {this.getSecondLineSummery()}
            </div>
        )
    }

    private getSecondLineSummery() {
        return (
            <div className="summery-second-line summery-line">
                {this.getQuestionSummery()}
                {this.getTagSumery()}
            </div>
        )

    }

    private getTagSumery() {
        return (
            <div className="tags-summery summery-item">
                <span className="post-head">
                    <span style={{ fontWeight: 'bold' }}>ট্যাগসমুহ(১০২৪)</span>
                </span>
                <div style={{ display: 'flex' }}>
                    <div className="tags-summery-div">
                        {this.getTagItem()}
                        {this.getTagItem()}
                        {this.getTagItem()}
                        {this.getTagItem()}
                    </div>
                </div>
                <span className="see-more">
                    <span>আরও দেখুন</span>
                    <span className="fa fa-long-arrow-right"></span>
                </span>


            </div>
        )
    }

    private getTagItem() {
        return (
            <div className="tag-item">
                <span>১ হা.</span>
                <span className="tag-item-name">গণিত</span>
                <span className="fa fa-close"></span>
                <span>২০০</span>
            </div>
        )
    }

    private getQuestionSummery() {
        return (
            <div className="question-summery summery-item">
                <span className="post-head">
                    <span style={{ fontWeight: 'bold' }}>প্রশ্নসমুহ(১০২৪)</span>
                </span>
                {this.getQuestionSummeryItem()}
                {this.getQuestionSummeryItem()}

                <span className="see-more">
                    <span>আরও দেখুন</span>
                    <span className="fa fa-long-arrow-right"></span>
                </span>
            </div>
        )
    }

    private getQuestionSummeryItem() {
        return (
            <div className="question-suumery-item">
                <span className="question-summery-item-rating">১৪২</span>
                <span>একটা অঙ্ক পারতেছিনা, কেউ সাহায্য করেন</span>
                <span style={{ marginLeft: 'auto' }}>সেপ্টেম্বার ১৭ '১৮</span>
            </div>
        )
    }

    private getFirstLineSummery() {
        return (
            <div className="summery-first-line summery-line">
                {this.getAnswerSummery()}
                {this.getPopularitySummery()}
            </div>
        )
    }

    private getAnswerSummery() {
        return (
            <div className="answer-summery summery-item">
                <span className="post-head">
                    <span style={{ fontWeight: 'bold' }}>উত্তরসমুহ (১০২৪)</span>
                </span>
                {this.getAnswerSummeryItem()}
                {this.getAnswerSummeryItem()}
                <span className="see-more">
                    <span>আরও দেখুন</span>
                    <span className="fa fa-long-arrow-right"></span>
                </span>
            </div>
        )
    }

    private getAnswerSummeryItem() {
        return (
            <div className="answer-summery-item">
                <span className="answer-summery-item-rating">১৪২</span>
                <span>একটা অঙ্ক পারতেছিনা, কেউ সাহায্য করেন</span>
                <span style={{ marginLeft: 'auto' }}>সেপ্টেম্বার ১৭ '১৮</span>
            </div>
        )
    }

    private getPopularitySummery() {
        return (
            <div className="popularities-summery summery-item">
                <span className="post-head">
                    <span style={{ fontWeight: 'bold' }}>জনপ্রীয়তা (১০২৪)</span>
                </span>
                {this.getPopularitySummeryItem()}
                {this.getPopularitySummeryItem()}
                <span className="see-more">
                    <span>আরও দেখুন</span>
                    <span className="fa fa-long-arrow-right"></span>
                </span>
            </div>
        )
    }

    private getPopularitySummeryItem() {
        return (
            <div className="popularity-summery-item">
                <span className="popularity-summery-item-rating">+১৪২</span>
                <span>একটা অঙ্ক পারতেছিনা, কেউ সাহায্য করেন</span>
                <span style={{ marginLeft: 'auto' }}>সেপ্টেম্বার ১৭ '১৮</span>

            </div>
        )
    }
    private getTopBarInfo() {
        return (
            <div className="top-bar-info">
                <div className="badge-info">
                    <span>বেজ সমুহ</span>
                    <div className="main-badges">
                        {this.getBadge('platinum')}
                        {this.getBadge('gold')}
                        {this.getBadge('silver')}
                    </div>
                    {this.getNewestBadges()}
                </div>
            </div>
        )
    }

    private getNewestBadges() {
        return (
            <div className="newest-comming-badge">
                <div className="newest-badge">
                    <span>নতুন বেজ</span>
                    <span className="new-badge-info">
                        <span className="fa fa-certificate platinum-badge-icon" style={{ marginLeft: '5px' }}></span>
                        <span style={{ margin: 'auto' }}>আলোকিত</span>
                    </span>
                </div>

                <div className="coming-badge" >
                    <span>পরবর্তী বেজ</span>
                    <span className="coming-badge-info">
                        <span className="fa fa-certificate platinum-badge-icon" style={{ marginLeft: '5px' }}></span>
                        <span style={{ margin: 'auto' }}>সত্যায়ক</span>
                    </span>
                </div>
            </div>
        )
    }

    private getBadge(badgeType: string) {

        let badgeManager = new Badge();
        let badge = badgeManager.badges.get(badgeType) as badge;


        return (
            <span className="main-badge-item" style={{ background: badge.background }}>
                <span className={"fa fa-certificate " + badge.icon} style={{ marginLeft: '5px' }}></span>
                <span style={{ margin: 'auto' }}>৬</span>
            </span>
        )
    }

    private getMenuBar() {
        return (
            <div className="menu-bar" style={{ marginTop: '40px' }}>
                <span className="menu-item active-item">সার সংক্ষেপ</span>
                <span className="menu-item ">উত্তর</span>
                <span className="menu-item ">প্রশ্ন</span>
                <span className="menu-item">ট্যাগসমুহ</span>
                <span className="menu-item">জনপ্রীয়তা</span>
                <span className="menu-item">বেজসমুহ</span>
            </div>
        )
    }

}