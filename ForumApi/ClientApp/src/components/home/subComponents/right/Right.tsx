import React, { Component } from "react";
import { Question } from "../../../../utilities/elements/questions/Question";
import { Pagination } from "../../../../utilities/elements/pagination/Pagination";
import "./right.css";
import { StatusBar } from "../../../../utilities/elements/statusBar/StatusBar";
import { Link } from "react-router-dom";
import { Loader } from "../../../../utilities/elements/loader/loader";

interface state{
    isLoading:boolean;
}

export class Right extends Component<any, state>{

    constructor(props:any){
        super(props);
        this.state = {isLoading:true};
    }

    public render() {
        if(this.state.isLoading){
            return <Loader />
        }
        return (
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
                        <Question />
                        <Question />
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