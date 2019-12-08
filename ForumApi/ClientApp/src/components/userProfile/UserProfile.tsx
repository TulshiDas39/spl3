import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { IUser, IQuestion } from "../../utils/Models";
import { Loader } from "../loader/loader";
import styles from "./styles/user_profile.module.scss";
import { utilityService } from "../../services/UtilityService";
import { UserProfileTab, IBadge } from "./Types";
import { Leftbar } from "../leftbar/Leftbar";
import { UserInfo } from "./UserInfo";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import { sideBarSubject } from "../../utils/Contexts";
import { SideBar } from "../../utils/Enums";
import { Link } from "react-router-dom";

interface state {
    isLoading: boolean;
}
export class UserProfile extends Component<RouteComponentProps, state>{


    private tab = UserProfileTab.Question;
    private user = {} as IUser;
    private userId: string;
    private questions: IQuestion[] = [];
    private questionsOfAnswers: IQuestion[] = [];
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

    private async fetchData() {

        try {
            this.user = await httpService.get(API_CALLS.userProfile + this.userId);
            this.questions = await httpService.get(API_CALLS.userQuestions + this.user.userId);
            this.questionsOfAnswers = await httpService.get(API_CALLS.questionsOfUserAnswer + this.user.userId);
            this.setState({ isLoading: false });

        } catch (err) {
            console.error(err);
        }

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

    private getBadgeValues(reputation: number): IBadge {
        let badge = {} as IBadge;

        badge.platinum = Math.floor(reputation/200);
        reputation = reputation % 200;
        badge.gold = Math.floor(reputation/100);
        reputation = reputation % 100;
        badge.silver = Math.floor(reputation/50);

        return badge;
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

    private getTimeStr(timeStamp: number) {
        return utilityService.getTimeInBengali_M_Y(timeStamp);
    }

    private changeTab(tab: UserProfileTab): void {
        this.tab = tab;
        this.setState(this.state);
    }

    getTabStyle(tab: UserProfileTab): React.CSSProperties | undefined {
        if (tab === this.tab) return {
            borderLeft: '1px solid #bbc0c4',
            borderRight: '1px solid #bbc0c4',
            borderTop: '2px solid #F48024',
            borderBottom: 'none'
        };
    }

    render() {
        if (this.state.isLoading) return <Loader />;

        return (
            <div className={styles.rightDiv}>
                <div className={styles.profileDiv}>
                    <div className={styles.userImageDiv}>
                        <img className={styles.userImage} src={this.user.image} alt="" />
                    </div>

                    <h3>{this.user.name}</h3>
                    <p style={{ textAlign: 'center' }}>জনপ্রিয়তাঃ {utilityService.convertToBengaliText(this.user.reputation)}</p>
                    <p>ট্যাগসমুহঃ {this.getTags()}</p>
                    <p>প্রশ্ন করেছেনঃ {utilityService.convertToBengaliText(this.questions.length)} টি</p>
                    <p>উত্তর দিয়েছেনঃ {utilityService.convertToBengaliText(this.questionsOfAnswers.length)} টি</p>
                </div>
                <div className={styles.head_bar}>
                    <span className={styles.user_profile} onClick={() => this.changeTab(UserProfileTab.Question)} style={this.getTabStyle(UserProfileTab.Question)}>প্রশ্ন</span>
                    <span className={styles.user_activity} onClick={() => this.changeTab(UserProfileTab.Answer)} style={this.getTabStyle(UserProfileTab.Answer)}>উত্তর</span>
                    <span className={styles.user_story} onClick={() => this.changeTab(UserProfileTab.Badge)} style={this.getTabStyle(UserProfileTab.Badge)}>ব্যাজ</span>
                </div>
                {this.tab === UserProfileTab.Question ? this.questions.map(item => this.getQuestion(item)) : null}
                {this.tab === UserProfileTab.Answer ? this.questionsOfAnswers.map(item => this.getAnswers(item)) : null}
                {this.getBadge()}
            </div>


        )
    }



    private getQuestion(question: IQuestion) {
        return (
            <div key={question.id} className={styles.topPostItem}>
                <span className="fa fa-question-circle-o"></span>
                <span style={{ padding: '3px 5px', background: 'green', margin: '0 6px', color: 'white' }}>{utilityService.convertToBengaliText(question.ratings)}</span>
                <Link to={"/answer/" + question.id} style={{ textDecoration: 'none' }}>{question.title}</Link>
                <span style={{ marginLeft: 'auto' }}>{this.getTimeStr(question.datetime)}</span>
            </div>

        )
    }

    private getAnswers(question: IQuestion) {
        return (
            <div key={question.id} className={styles.topPostItem}>
                <span className="fa fa-reply"></span>
                <span style={{ padding: '3px 5px', background: 'green', margin: '0 6px', color: 'white' }}>{utilityService.convertToBengaliText(question.ratings)}</span>
                <Link to={"/answer/" + question.id} style={{ textDecoration: 'none' }}>{question.title}</Link>
                <span style={{ marginLeft: 'auto' }}>{this.getTimeStr(question.datetime)}</span>
            </div>
        )
    }

    private getBadge() {
        if (this.tab !== UserProfileTab.Badge) return ;

        let badge:IBadge = this.getBadgeValues(this.user.reputation);

         return (
            <div className={styles.badges_container} style={{ marginTop: '30px', fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}>
                <div className={styles.badge_head} style={{ borderBottom: '1px solid #d6d9dc' }}>
                    <span>বেজসমুহ</span>
                </div>
                <div className={styles.badges}>
                    <div className="badge_item" style={{
                        display: 'flex', flexDirection: 'column', background: 'paleturquoise',
                        padding: '20px 80px'
                    }}>
                        <span>প্লাটিনাম</span>
                        <span style={{ textAlign: 'center' }}>{utilityService.convertToBengaliText(badge.platinum)}</span>
                    </div>
                    <div className="badge_item" style={{
                        display: 'flex', flexDirection: 'column', background: 'gold',
                        padding: '20px 80px'
                    }}>
                        <span>সোনা</span>
                        <span style={{ textAlign: 'center' }}>{utilityService.convertToBengaliText(badge.gold)}</span>
                    </div>
                    <div className="badge_item" style={{
                        display: 'flex', flexDirection: 'column',
                        background: 'silver', padding: '20px 80px'
                    }}>
                        <span>রুপা</span>
                        <span style={{ textAlign: 'center' }}>{utilityService.convertToBengaliText(badge.silver)}</span>
                    </div>

                </div>
            </div>)
    }

}