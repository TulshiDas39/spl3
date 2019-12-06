import { ISearchResult } from "./Types";
import React, { Component } from "react";
import { Leftbar } from "../leftbar/Leftbar";
import { Link } from "react-router-dom";
import { StatusBar } from "../statusBar/StatusBar";
import { Question } from "../question/Question";
import { IQuestion } from "../../utils/Models";
import { searchResultService } from "./SearchResutlService";
import { Loader } from "../loader/loader";
import styles from "./searchResult.module.scss";

interface state {
    isLoading: boolean;
}

export class SearchResult extends Component<ISearchResult, state> {
    static displayName = SearchResult.name;
    private questionList: IQuestion[] = [];

    constructor(props: ISearchResult) {
        super(props);
        this.state = { isLoading: true }
        console.log('serach value');
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps: ISearchResult) {
        if (prevProps !== this.props) this.fetchData();
    }

    private fetchData() {
        const { search } = this.props.match.params as any;
        console.log('fetching question data');
        searchResultService.fetchSearchedQuestions(search).then(data => {
            this.questionList = data;
            console.log('counting views');
            this.setState({ isLoading: false });
        });

    }

    public render(): JSX.Element {
        if (this.state.isLoading) return <Loader />
        return (
            <div id={styles.parentDiv}>
                <Leftbar />
                <div id={styles.right}>
                    <div id={styles.questionDiv}>
                        <div id={styles.question_heading}>
                            <div className={styles.main_questions_text}>
                                প্রত্যাশিত প্রশ্নসমুহ
                        </div>
                            <Link to="/ask" id={styles.ask}>
                                প্রশ্ন করুন
                            </Link>
                        </div>
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

                    </div>
                    <StatusBar />
                </div>

            </div>
        );
    }
}