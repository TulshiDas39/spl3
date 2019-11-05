import React, { Component } from "react";
import { Pagination } from "../../../pagination/Pagination";
import "./right.css";
import { StatusBar } from "../../../statusBar/StatusBar";
import { Link } from "react-router-dom";
import { Loader } from "../../../loader/loader";
import { IQuestion } from "../../../../utils/Models";
import { Question } from "../../../questions/Question";
import { Auth0Context } from "../../../../utils/Contexts"
import { IAuth0Contex, IUserCredential } from "../../../../utils/Structures";
import { FetchData } from "../../Service";

interface state {
    isLoading: boolean;
}

interface props {
    userId?: string;
}

export class Right extends Component<props, state>{
    private iteration = 0;
    private questionList: IQuestion[] = [];
    static contextType = Auth0Context;

    constructor(props: props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount(){
        FetchData(this.context,this.iteration).then((data)=>{
            this.questionList = data as IQuestion[];
            this.setState({ isLoading: false });
        }, err=>{
            console.error(err);
        });
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