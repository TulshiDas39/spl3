import React, { Component } from "react";
import { Pagination } from "../../../pagination/Pagination";
import styles from "./right.module.scss";
import { StatusBar } from "../../../statusBar/StatusBar";
import { Link } from "react-router-dom";
import { Loader } from "../../../loader/loader";
import { IQuestion } from "../../../../utils/Models";
import { Question } from "../../../question/Question";
import { Auth0Context } from "../../../../utils/Contexts"
import { IAuth0Context, IAppState } from "../../../../utils/Structures";
import { homeService } from "../../HomeService";
import { HomePageTab } from "../../../../utils/Enums";
import { colors } from "../../../../utils/colors";

interface state {
    isLoading: boolean;
}

export class Right extends Component<any, state>{
    private iteration = 0;
    private questionList: IQuestion[] = [];
    static contextType = Auth0Context;
    private tab = HomePageTab.RECOMMENDED;

    constructor(props: any) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        console.log("component did mount");
        this.fetchData();
    }

    private fetchData() {
        if (this.context.isAuthenticated) {
            this.getInitialQuestions();
        }
        else {
            this.getLatestQuestions();
        }

    }

    private showRecommendedQuestions() {
        this.iteration = 0;
        this.getRecommendedQuestions();
    }

    private async getRecommendedQuestions() {
        let context = this.context as IAuth0Context;


        if (!this.context.isAuthenticated) {
            let appState: IAppState;
            appState = {
                appState: {
                    targetUrl: window.location.pathname
                }
            }
            context.loginWithRedirect(appState);
        }

        let userId = context.user.sub;
        homeService.fetchRecommendedQuestions(context.token, userId, this.iteration).then(data => {
            this.tab = HomePageTab.RECOMMENDED;
            this.questionList = data;
            this.setState({ isLoading: false });
        })
    }

    private showLatestQuestions() {
        this.iteration = 0;
        this.getLatestQuestions();
    }

    private getLatestQuestions() {
        homeService.fetchLatestQuestion(this.iteration).then(data => {
            this.tab = HomePageTab.ALL;
            this.questionList = data;
            this.setState({ isLoading: false });
        });
    }

    private showAnswerlessQuestions() {
        this.iteration = 0;
        this.getAnswerLessQuestions();
    }

    private getAnswerLessQuestions(): void {
        homeService.fetchAnswerLessQuestions(this.iteration).then(data => {
            this.questionList = data;
            this.tab = HomePageTab.UNANSWERED;
            this.setState({ isLoading: false });
        })
    }

    private eventNext() {
        this.iteration++;
        this.loadMoreQuestions();
    }

    private eventPrev() {
        this.iteration--;
        if (this.iteration < 0) this.iteration = 0;
        this.loadMoreQuestions();
    }

    private loadMoreQuestions() {
        if (this.tab === HomePageTab.ALL) {
            this.getLatestQuestions();
        }
        else if (this.tab === HomePageTab.UNANSWERED)
            this.getAnswerLessQuestions();
        else
            this.getRecommendedQuestions();
    }

    private async getInitialQuestions() {
        let context = this.context as IAuth0Context;
        let userId = context.user.sub;
        homeService.fetchRecommendedQuestions(context.token, userId, this.iteration).then(data => {
            if (data.length === 0) {
                this.getLatestQuestions();
            }
            else {
                this.tab = HomePageTab.RECOMMENDED;
                this.questionList = data;
                this.setState({ isLoading: false });
            }
        })
    }

    public render() {
        console.log("context");
        console.log(this.context);
        if (this.state.isLoading) {
            return <Loader />;
        }

        return (
            <div id={styles.right}>
                <div id={styles.questionDiv}>
                    <div id={styles.question_heading}>
                        <div className={styles.main_questions_text}>
                            প্রধান প্রশ্নসমূহ
                        </div>
                        <Link to="/ask" id={styles.ask}>
                            প্রশ্ন করুন
                        </Link>

                    </div>
                    {this.getTabs()}
                    <div className={styles.questionList}>
                        {
                            this.questionList.length === 0 ? <p>No recommended questions found</p> :
                                this.questionList.map((q) => <Question key={q.id + "questionItem"} data={q} />)
                        }
                    </div>

                    {/* <p className="see-all-question">
                        <a className="go-allquestion" href="">সকল প্রশ্ন দেখুন।</a>
                        <a className="go-unaswered" href="">উত্তরহীন প্রশ্নগুলোতে আমাদের সাহায্য করুন</a>
                    </p> */}

                    {this.getPagination()}
                </div>
                <StatusBar />
            </div>
        )
    }

    private getPagination() {
        return <Pagination eventNext={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />;
    }

    private getTabs() {
        return (
            <div className={styles.question_filter}>
                <div style={{ background: this.tab === HomePageTab.RECOMMENDED ? colors.tagBackground : '' }}
                    onClick={() => this.showRecommendedQuestions()}>উপযোগী</div>
                <div style={{ background: this.tab === HomePageTab.UNANSWERED ? colors.tagBackground : '' }}
                    onClick={() => this.showAnswerlessQuestions()}>উত্তরহীন</div>
                <div style={{ background: this.tab === HomePageTab.ALL ? colors.tagBackground : '' }}
                    onClick={() => this.showLatestQuestions()}>সকল প্রশ্ন</div>
            </div>
        )
    }

}