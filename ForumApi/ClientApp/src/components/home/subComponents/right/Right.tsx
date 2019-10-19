import React, { Component } from "react";
import { Pagination } from "../../../pagination/Pagination";
import "./right.css";
import { StatusBar } from "../../../statusBar/StatusBar";
import { Link } from "react-router-dom";
import { Loader } from "../../../loader/loader";
import {TQuestion} from "../../../../utils/Models";
import { Question } from "../../../questions/Question";

interface state{
    isLoading:boolean;
}

interface props{
    userId:string;
}

export class Right extends Component<props, state>{
    private iteration = 0;
    private questionList:TQuestion[] =[];
    constructor(props:props){
        super(props);
        this.state = {isLoading:true};
        this.FetchData();
    }

    private FetchData() {
        fetch('api/questions/recommend/'+this.iteration+"/"+this.props.userId,{
            method: 'POST',
        }).then((res:Response)=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            this.questionList = data;
            console.log('Answer of questions:');
            console.log(this.questionList);
            this.setState({isLoading:false});
            
        }).catch(err=>{
            console.log('error fetching question data');
            console.log(err);
        })
    }

    public render() {
        if(this.state.isLoading){
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
                            this.questionList.map((q,index)=> <Question key={index+"questionItem"} data = {q}/>)
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