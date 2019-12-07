import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { IUser } from "../../utils/Models";
import { userProfileService } from "./userProfileService";
import { Loader } from "../loader/loader";
import styles from "./styles/user_profile.module.scss";
import { utilityService } from "../../services/UtilityService";
import { UserTab } from "./Types";
import { Leftbar } from "../leftbar/Leftbar";
import { UserInfo } from "./UserInfo";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { sideBarSubject } from "../../utils/Contexts";
import { SideBar } from "../../utils/Enums";

interface state {
    isLoading: boolean;
}
export class UserProfile extends Component<RouteComponentProps, state>{


    private tab = UserTab.PROFile;
    private user = {} as IUser;
    private userId: string;
    private questionCount = 0;
    private answerCount = 0;
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { isLoading: true }
        this.userId = (props.match.params as any).userId;
        console.log('user id:' + this.userId);
    }

    componentDidMount() {
        sideBarSubject.next(SideBar.USERS);
        this.fetchData();
    }

    private fetchData() {
        userProfileService.getUserInfo(this.userId).then(data => {
            this.user = data;
            console.log('user profile:');
            console.log(data);
            this.getQuestionCount();
        })
    }

    private getTags() {
        let tagStr = "";
        if (this.user.tags === "") return "No tags are followed";
        let splited = utilityService.tokenize(this.user.tags);
        for (let i = 0; i < splited.length - 1; i++) {
            tagStr += splited[i] + ",";
        }

        tagStr += splited[splited.length - 1];
        return tagStr;
    }

    private getQuestionCount(){
        httpService.get(API_CALLS.countUserQuestions+this.user.userId).then(data=>{
            console.log('question count:'+this.questionCount);
            this.questionCount = data;
            this.getAnswerCount();
        })
    }

    private getAnswerCount(){
        httpService.get(API_CALLS.answerCountForUser+this.user.userId).then(data=>{
            this.answerCount = data;
            this.setState({isLoading:false});
        })
    }

    renderAdvance() {
        return (
            <div className={styles.mainContainer}>
                <Leftbar key="leftBar" /> ,
                <div key="rightDiv" className={styles.right}>
                    <div className={styles.head_bar}>
                        <span className={styles.user_profile}>প্রোফাইল</span>
                        <span className={styles.user_activity}>সক্রিয়তা</span>
                        <span className={styles.user_story}>ব্যবহারকারী বিবরণ</span>
                    </div>
                    <UserInfo />
                </div>,
            </div>
        )
    }


    render() {
        if (this.state.isLoading) return <Loader />;

        return (
            <div className={styles.profileDiv}>
                <div className={styles.userImageDiv}>
                    <img className={styles.userImage} src={this.user.image} alt="" />
                </div>

                <h3>{this.user.name}</h3>
                <p style={{ textAlign: 'center' }}>জনপ্রিয়তাঃ {utilityService.convertToBengaliText(this.user.reputation)}</p>
                <p>ট্যাগসমুহঃ {this.getTags()}</p>
                <p>প্রশ্ন করেছেনঃ {utilityService.convertToBengaliText(this.questionCount)} টি</p>
                <p>উত্তর দিয়েছেনঃ {utilityService.convertToBengaliText(this.answerCount)} টি</p>
            </div>
        )
    }
}