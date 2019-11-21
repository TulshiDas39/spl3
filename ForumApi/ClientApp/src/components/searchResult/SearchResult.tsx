import { ISearchResult } from "./Types";
import React, { Component } from "react";
import { Leftbar } from "../leftbar/Leftbar";
import { Link } from "react-router-dom";
import { StatusBar } from "../statusBar/StatusBar";
import { Question } from "../question/Question";
import { IQuestion } from "../../utils/Models";
import { searchResultService } from "./SearchResutlService";

export class SearchResult extends Component<ISearchResult, any> {
    static displayName = SearchResult.name;
    private questionList: IQuestion[] = [];

    constructor(props: ISearchResult) {
        super(props);
        console.log('serach value');
    }

    componentDidMount() {
        this.fetchData();
    }

    private fetchData() {
        const { search } = this.props.match.params as any;
        console.log('fetching question data');
        searchResultService.fetchSearchedQuestions(search).then(data => {
            this.questionList = data;
            console.log('counting views');
            this.setState({ isloading: false });
        });

    }

    public render(): JSX.Element {
        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="right">
                    <div id="questionDiv">
                        <div id="question_heading">
                            <div className="main-questions-text">
                                প্রত্যাশিত প্রশ্নসমুহ
                        </div>
                            <Link to="/ask" id="ask">
                                প্রশ্ন করুন
                        </Link>
                        </div>
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

                    </div>
                    <StatusBar />
                </div>

            </div>
        );
    }
}