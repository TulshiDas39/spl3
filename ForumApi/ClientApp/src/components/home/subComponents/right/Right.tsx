import React, { Component } from "react";
import { Pagination } from "../../../pagination/Pagination";
import "./right.css";
import { StatusBar } from "../../../statusBar/StatusBar";
import { Link } from "react-router-dom";
import { Loader } from "../../../loader/loader";
import { TQuestion } from "../../../../utils/Models";
import { Question } from "../../../questions/Question";
import { Auth0Context } from "../../../../utils/Contexts"
import { IAuth0Contex, IUserCredential } from "../../../../utils/Structures";

interface state {
    isLoading: boolean;
}

interface props {
    userId?: string;
}

export class Right extends Component<props, state>{
    private iteration = 0;
    private questionList: TQuestion[] = [];
    static contextType = Auth0Context;

    constructor(props: props) {
        super(props);
        this.state = { isLoading: true };
        // this.FetchData();
    }

    private async FetchData() {
        let context = this.context as IAuth0Contex;
        console.log('in home component:');
        console.log(context);
        if (context.isAuthenticated) {
            let token = await context.getTokenSilently();
            let user = context.user as IUserCredential;
            this.fetchRecommendedData(token, user.sub);
        }
        else {
            this.fetchLatestQuestion();
        }

    }

    fetchLatestQuestion() {
        fetch('api/questions/' + this.iteration + "/").
            then((res: Response) => {
                return res.json();
            }).then(data => {
                console.log(data);
                this.questionList = data;
                console.log('Answer of questions:');
                console.log(this.questionList);
                this.iteration++;
                this.setState({ isLoading: false });

            }).catch(err => {
                console.log('error fetching question data');
                console.log(err);
            })
    }

    fetchRecommendedData(token: string, userId: string) {
        fetch('api/questions/recommend/' + this.iteration + "/" + userId, {
            method: 'POST',
            headers: new Headers({
                "Authorization": "Bearer " + token
            })
        }).then((res: Response) => {
            return res.json();
        }).then(data => {
            console.log(data);
            this.questionList = data;
            console.log('Answer of questions:');
            console.log(this.questionList);
            this.iteration++;
            this.setState({ isLoading: false });

        }).catch(err => {
            console.log('error fetching question data');
            console.log(err);
        })
    }



    public render() {
        console.log("context");
        console.log(this.context);
        if (this.state.isLoading) {
            return <Loader />;
        }


        else return (
            <div id="right">

                <div id="questionDiv">
                    <div id="question_heading">
                        <div className="main-questions-text">
                            প্রধান প্রশ্নসমূহ
                        </div>
                        <Link to="/ask" id="ask">
                            প্রশ্ন করুন
                        </Link>

                    </div>
                    <div className="question_filter">
                        <div>সর্বশেষ</div>
                        <div>উত্তরহীন</div>
                        <div>উপহারযুক্ত</div>
                        <div>সকল বিষয়</div>
                    </div>
                    <div className="questionList">
                        {
                            this.questionList.map((q, index) => <Question key={index + "questionItem"} data={q} />)
                        }
                    </div>


                    <p className="see-all-question">
                        <a className="go-allquestion" href="">সকল প্রশ্ন দেখুন।</a>
                        <a className="go-unaswered" href="">উত্তরহীন প্রশ্নগুলোতে আমাদের সাহায্য করুন</a>
                    </p>

                    <Pagination />
                </div>
                <StatusBar />
            </div>
        )
    }
}