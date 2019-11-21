import React, { Component } from "react";
import { Pagination } from "../../../pagination/Pagination";
import "./right.css";
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
import { IRightProps } from "../../Types";

interface state {
    isLoading: boolean;
}

export class Right extends Component<IRightProps, state>{
    private iteration = 0;
    private questionList: IQuestion[] = [];
    static contextType = Auth0Context;
    private tab = HomePageTab.RECOMMENDED;
    //private search?: string;

    constructor(props: IRightProps) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        console.log("component did mount");
        this.fetchData();
    }

    componentDidUpdate(prevProps: IRightProps) {
        console.log('prev props:');
        console.log(prevProps);
        console.log('current props:');
        console.log(this.props);
        if (prevProps.search != this.props.search) this.fetchData();
    }

    private fetchData() {
        if (this.props.search) {
            this.getSearchedQuestions();
            return;
        }
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

    private getSearchedQuestions() {
        homeService.fetchSearchedQuestions(this.props.search as any).then(data => {
            this.questionList = data;
            this.setState({ isLoading: false });
        })
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

        let token = await context.getTokenSilently();
        let userId = context.user.sub;
        homeService.fetchRecommendedQuestions(token, userId, this.iteration).then(data => {
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
        if (this.tab = HomePageTab.ALL) {
            this.getLatestQuestions();
        }
        else if (this.tab == HomePageTab.UNANSWERED)
            this.getAnswerLessQuestions();
        else
            this.getRecommendedQuestions();
    }

    private async getInitialQuestions() {
        let context = this.context as IAuth0Context;
        let token = await context.getTokenSilently();
        let userId = context.user.sub;
        homeService.fetchRecommendedQuestions(token, userId, this.iteration).then(data => {
            if (data.length == 0) {
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
            <div id="right">
                <div id="questionDiv">
                    <div id="question_heading">
                        <div className="main-questions-text">
                            {this.props.search ? "প্রত্যাশিত প্রশ্নসমুহ" : "প্রধান প্রশ্নসমূহ"}
                        </div>
                        <Link to="/ask" id="ask">
                            প্রশ্ন করুন
                        </Link>

                    </div>
                    {this.getTabs()}
                    <div className="questionList">
                        {
                            this.questionList.length == 0 ? <p>No recommended questions found</p> :
                                this.questionList.map((q, index) => <Question key={index + "questionItem"} data={q} />)
                        }
                    </div>

                    <p className="see-all-question">
                        <a className="go-allquestion" href="">সকল প্রশ্ন দেখুন।</a>
                        <a className="go-unaswered" href="">উত্তরহীন প্রশ্নগুলোতে আমাদের সাহায্য করুন</a>
                    </p>

                    {this.getPagination()}
                </div>
                <StatusBar />
            </div>
        )
    }

    private getPagination(){
        if(!this.props.search){
            return <Pagination eventNext={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />;
        }
    }

    private getTabs() {
        if (!this.props.search) {
            return (
                <div className="question_filter">
                    <div style={{ background: this.tab == HomePageTab.RECOMMENDED ? colors.tagBackground : '' }}
                        onClick={() => this.showRecommendedQuestions()}>উপযোগী</div>
                    <div style={{ background: this.tab == HomePageTab.UNANSWERED ? colors.tagBackground : '' }}
                        onClick={() => this.showAnswerlessQuestions()}>উত্তরহীন</div>
                    <div style={{ background: this.tab == HomePageTab.ALL ? colors.tagBackground : '' }}
                        onClick={() => this.showLatestQuestions()}>সকল প্রশ্ন</div>
                </div>
            )
        }
    }

}