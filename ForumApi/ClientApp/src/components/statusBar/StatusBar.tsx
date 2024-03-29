import React, { Component } from "react";
import styles from "./statusBar.module.scss";
import { Loader } from "../loader/loader";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { ITag, IQuestion } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { ITagInfo } from "../../utils/Structures";
import { Link } from "react-router-dom";
import {StatusData } from "../../utils/data";

interface state {
    isLoading: boolean;
}

export class StatusBar extends Component<any, state>{

    static contextType = Auth0Context;
    private popularTags: ITagInfo[] = [];
    private popularQuestions: IQuestion[] = [];

    constructor(props: any) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.popularQuestions = StatusData.popularQuestionsThisWeek;
        this.popularTags = StatusData.popularTags;
        if (this.popularQuestions.length === 0) this.fetchData();
        else this.setState({isLoading:false});

    }

    async fetchData() {
        try {
            this.popularTags = await httpService.get(API_CALLS.tagList);
            if (this.context.isAuthenticated) this.popularQuestions = await httpService.get(API_CALLS.popularQuestionsWeekly + this.context.user.sub);
            else this.popularQuestions = await httpService.get(API_CALLS.popularQuestionsWeekly);
            StatusData.popularQuestionsThisWeek = this.popularQuestions;
            this.popularTags.splice(3, this.popularTags.length - 3);
            StatusData.popularTags = this.popularTags;
            this.setState({ isLoading: false });
        } catch (err) {
            console.error(err);
        }
    }

    public render() {
        if (this.state.isLoading) return this.getEmpty();
        return (
            <div id={styles.status_bar}>
                <div className={styles.section_header}>
                    <span>তথ্য</span>
                </div>
                <div id={styles.info}>
                    <span className="fa fa-info-circle"></span>
                    <span> সমীকরনে আপনাকে স্বাগতম, জ্ঞান বিস্তারে সহায়তা করাই সমীকরনের লক্ষ </span>
                </div>

                <div className={styles.section_header}>
                    <span> সর্বোচ্চ অনুসরণকৃত</span>
                </div>
                <div id={styles.tags}>
                    {this.popularTags.map(item => <span key={item.tag.id}>{item.tag.name}</span>)}
                </div>

                <div className={styles.section_header}>
                    <span> এই সপ্তাহের জনপ্রিয় প্রশ্নসমুহ </span>
                </div>
                <div id={styles.info}>
                    {this.popularQuestions.map(item => <Link className={styles.popularQuestion} to={"/answer/" + item.id} key={item.id}>{item.title}</Link>)}
                </div>
            </div>
        )

    }

    getEmpty() {
        return (
            <div style={{ width: '300px', textAlign: 'center' }}>
                <Loader />
            </div>
        )
    }
}