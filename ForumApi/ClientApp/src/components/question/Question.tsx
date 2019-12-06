import React, { Component } from "react";
import styles from "./question.module.scss";
import { Link } from "react-router-dom";
import { IUser } from "../../utils/Models";
import { utilityService } from "../../services/UtilityService";
import { QuestionProps } from "./Types";
import { questionService } from "./QuestionServices";
import { Auth0Context } from "../../utils/Contexts";

interface state {
    isLoading: boolean;
}

export class Question extends Component<QuestionProps, state>{

    private tags: string[] = [];
    private user: IUser = {} as IUser;
    static contextType = Auth0Context;
    private answerCount = 0;
    constructor(props: QuestionProps) {
        super(props);
        this.state = { isLoading: true }
    }

    componentDidMount() {
        this.init();
    }

    private async init() {
        this.tags = this.props.data.tags.trim().split(/\s+/);
        try {
            this.user = await questionService.getUser(this.props.data.userId);
            this.answerCount = await questionService.getAnswerCount(this.props.data.id);
            this.setState({ isLoading: false });
        } catch (err) {
            console.error(err);
        }

    }


    private async loadUserInfo() {
        questionService.getUser(this.props.data.userId).then(data => {
            console.log('user info:');
            console.log(data);
            this.user = data;
            this.setState({ isLoading: false });
        }, err => {
            console.error(err);
        })
    }

    public render() {
        if (this.state.isLoading) return <p></p>;
        return (
            <div className={styles.questions}>
                <div className={styles.question_status}>
                    <Link to="/answer" className={styles.votes + " " + styles.statusItem}>
                        <span className={styles.vote_number}>{utilityService.convertToBengaliText(this.props.data.ratings)}</span>
                        <span className={styles.vote_text}>ভোট</span>
                    </Link>
                    <Link to="/answer" className={styles.answered + " " + styles.statusItem}>
                        <span className={styles.answer_number}>{utilityService.convertToBengaliText(this.answerCount)}</span>
                        <span className={styles.answer_text}>উত্তর</span>
                    </Link>
                    <Link to="/answer" className={styles.views + " " + styles.statusItem}>
                        <span className={styles.view_number}>{utilityService.convertToBengaliText(this.props.data.views)}</span>
                        <span className={styles.view_text}>দেখা</span>
                    </Link>
                </div>

                <div className={styles.question_text}>
                    <Link to={"/answer/" + this.props.data.id} className={styles.question_title}>{this.props.data.title}</Link>
                    <div className={styles.question_tags}>
                        {this.tags.map((tag, index) => <span key={"tagKey" + index} className={styles.tagItem}>{tag}</span>)}
                    </div>
                    <div className={styles.question_time}>
                        <span className={styles.question_time_tex}>{new Date(this.props.data.datetime).toLocaleString()}</span>
                        <span className={styles.question_time_user}>{this.user.name}</span>
                        <span className={styles.question_time_user_rating}>{this.user.reputation}</span>
                    </div>
                </div>
            </div>
        )
    }
}