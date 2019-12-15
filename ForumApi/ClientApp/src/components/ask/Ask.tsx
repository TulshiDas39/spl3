import React, { Component } from "react";
import { TagInput } from "../reactTagEditor/TagInput";
import styles from "./ask.module.scss";
//import "./question_list.scss";
import { Auth0Context, sideBarSubject } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { IQuestion} from "../../utils/Models";
import Loading from "../loader/Loading";
import { Question } from "../question/Question";
import { askServices } from "./AskServices";
import { SideBar } from "../../utils/Enums";
import { Loader } from "../loader/loader";

interface state {
    currentStep: number;
    loadSimilarities: boolean;
}

interface props {
    history: string[]
}

interface tabProperties {
    background: string;
    color: string
}

export class Ask extends Component<props, state>{
    private stepsCompleted = [false, false, false, true, false, false];
    private activeTabBackground = '#07C';
    private tabStyles: tabProperties[] = [];
    private displayOfSteps: string[] = ['', 'none', 'none', 'none', 'none', 'none'];
    private data: IQuestion = {} as IQuestion;
    private similarQuestions: IQuestion[] = [];
    static contextType = Auth0Context;
    private tags: string[] = [];

    constructor(props: props) {
        super(props);
        sideBarSubject.next(SideBar.NONE);
        this.state = {
            currentStep: 0,
            loadSimilarities: false
        }
        this.init();
    }


    private init() {
        this.tabStyles[0] = { background: this.activeTabBackground, color: 'white' };
        for (let i = 1; i < 5; i++) {
            this.tabStyles[i] = { background: '', color: this.activeTabBackground };
        }

        this.data = {} as IQuestion;
    }

    componentDidUpdate() {
        console.log('component did update');
        if (this.state.loadSimilarities) this.fetchSimilarQuestions();
    }

    private async post() {
        let context = this.context as IAuth0Context;
        this.data.tags = this.getTagsAsString();
        this.data.datetime = new Date().getTime();
        this.data.ratings = 0;
        this.data.userId = context.user.sub;
        this.data.isAccepted = false;
        this.data.views = 0;

        askServices.postQuestion(this.data, context.token).then(response => {
            let data = response as IQuestion;
            this.props.history.push('/answer/' + data.id);
        }, err => {
            console.error(err);
        })

    }

    private async fetchSimilarQuestions() {
        let questionData = this.data.title+"|";
        this.tags.forEach(val => questionData += " " + val);
        questionData = questionData.trim().replace(/[.?,/#!^&]/g, "");
        console.log('tags are pushed: ' + questionData);
        askServices.getSimilarQuestion(questionData, this.context.token).then(data => {
            this.similarQuestions = data;
            this.setState({
                loadSimilarities: false
            });
        }, err => {
            console.error(err);
        });
    }

    public render() {
        return (
            <div style={{width:'100%'}}>
                {this.getHead()}
                <div id={styles.middle}>
                    <span id={styles.image} className="fa fa-question-circle" style={{ display: this.state.currentStep < 2 ? '' : 'none' }}> </span>
                    {this.getSteps()}
                </div>
            </div>
        )
    }

    private getSteps() {
        return (
            <div id={styles.steps}>
                <h1 id={styles.type} className={styles.about_question} style={{ display: this.displayOfSteps[0] }}>আপনার কী ধরনের প্রশ্ন রয়েছে?</h1>
                <span id={styles.suggest} className={styles.about_question} style={{ display: this.displayOfSteps[0] }}>আপনাকে সঠিক উত্তর প্রদান করতে আমরা সর্বোচ্চ চেষ্টা করব</span>

                {this.getQuestionType()}
                <h1 className={styles.review} style={{ display: this.displayOfSteps[5] }}>আপনার প্রশ্নটি পরিদর্শন করে নিন</h1>
                <span className={styles.review} style={{ display: this.displayOfSteps[5] }}>সবকিছু আরেকবার দেখে নিন, কোন ভুল থাকলে তা এখানে সংসোধন করে নিতে পারেন</span>

                <h1 className={styles.titleDiv} style={{ display: this.displayOfSteps[2] }}>আপনার প্রশ্নের শিরোনাম দিন</h1>
                <span id={styles.title_tips} className={styles.titleDiv} style={{ display: this.displayOfSteps[2] }}>প্রশ্নের শিরোনামের মাধ্যমে প্রশ্নের প্রাথমিক অর্থ প্রকাশ পায়,
                ফলে উত্তর প্রদান সহজ হয়</span>
                <h4 id={styles.title_level} className={styles.titleDiv+" "+ styles.review} style={{ display: this.state.currentStep === 2 ? this.displayOfSteps[2] : this.displayOfSteps[5] }}>শিরোনাম</h4>
                <input id={styles.title_input} type="text" name="" className={styles.titleDiv+" "+ styles.review} style={{ display: this.state.currentStep === 2 ? this.displayOfSteps[2] : this.displayOfSteps[5] }} onChange={this.saveQuestionTitle.bind(this)} />


                <h1 className={styles.ask_tags} style={{ display: this.displayOfSteps[1], marginBottom: 0 }}>আপনি কোন শ্রেণীর কারিকুলাম, বিষয়, অনুশীলনী বা সমস্যা নিয়ে প্রশ্ন
                করতে চান?</h1>
                <span className={styles.ask_tags} style={{ display: this.displayOfSteps[1], marginTop: '20px 0' }} >
                    ট্যাগ এর মাধ্যমে সঠিক ব্যাক্তি আপনার প্রশ্নটি পেয়ে থাকেন এবং উত্তর দিয়ে থাকেন
                </span>
                <span style={{ fontWeight: 'bold', display: this.state.currentStep === 1 ? this.displayOfSteps[1] : this.displayOfSteps[5], marginTop: '20px' }} className="styles.ask_tags styles.review">ট্যাগ</span>

                <div className={styles.ask_tags+" "+ styles.review} style={{ display: this.state.currentStep === 1 ? this.displayOfSteps[1] : this.displayOfSteps[5] }}>
                    <TagInput additionHandler={this.handleAddition.bind(this)} deleteHandler={this.handleDelete.bind(this)} />
                </div>


                <div id={styles.similarityDiv} className={styles.similarity_check} style={{ display: this.displayOfSteps[3] }}>
                    <h1>আপনার প্রশ্নের উত্তর কি এখানে আছে?</h1>
                    <span>এখানে আপনার প্রশ্নের সমতুল্য প্রশ্ন থাকতে পারে</span>
                </div>
                <div id={styles.guid} className={styles.description} style={{ display: this.displayOfSteps[4] }}>
                    <h1>প্রশ্ন সম্পর্কে বিস্তারিত তথ্য দিন</h1>
                    <span>প্রশ্নের বর্ণনা উত্তর প্রদানে প্রয়োজনীয় তথ্য সর্বরাহ করে থাকে</span>
                </div>
                <div className={styles.similar_questions+" "+ styles.similarity_check} style={{ display: this.displayOfSteps[3] }}>
                    <div className={styles.head_space}>
                        <span style={{ padding: '0 5px' }}>Similar question</span>
                    </div>

                    {this.getSimilarQuestion()}

                </div>

                {this.getGuidDiv()}

                <div id={styles.btnDiv}>
                    <button id={styles.prevBtn} className={styles.btns} style={{ display: this.state.currentStep === 0 ? '' : 'block' }} onClick={() => { this.changeStep(this.state.currentStep - 1) }} >পুর্ববর্তী ধাপ</button>
                    <button id={styles.nextBtn} className={styles.btns} onClick={() => { this.changeStep(this.state.currentStep + 1) }}>{this.state.currentStep === 5 ? "নিশ্চিত করুন" : "পরবর্তী ধাপ"} </button>
                </div>

            </div>
        )
    }



    private getTagsAsString() {
        let tags = this.tags;
        let tagStr = "";
        tags.forEach(element => {
            tagStr += " " + element
        });
        console.log('tagStr:' + tagStr);
        return tagStr;
    }

    private saveQuestionTitle(event: any) {
        this.data.title = event.target.value;
        this.stepsCompleted[2] = this.data.title ? true : false;
    }

    private changeStep(nexStep: number) {
        console.log('change Step:' + nexStep);
        if (nexStep === 6) this.post();
        if (!this.stepCompleted(nexStep) && nexStep > this.state.currentStep) return;
        this.displayOfSteps[this.state.currentStep] = 'none';
        this.displayOfSteps[nexStep] = '';
        this.setState({
            currentStep: nexStep,
            loadSimilarities: nexStep === 3 ? true : false
        })

    }

    private stepCompleted(nexStep: number) {
        for (let i = this.state.currentStep; i < nexStep; i++) {
            if (this.stepsCompleted[i] === false) return false;
        }
        return true;
    }

    public handleDelete(i: number) {
        console.log('delete ' + i);
        console.log('before delete:');
        console.log(this.tags);
        this.tags.splice(i, 1);
        console.log('after delete:');
        console.log(this.tags);
        this.stepsCompleted[1] = this.tags.length === 0 ? false : true;

    }

    public handleAddition(tag: string) {

        this.tags.push(tag);
        this.stepsCompleted[1] = true;
        console.log('tag added:' + tag);
    }

    private handleTypeChange(event: any) {
        console.log(event.target.value);
        this.stepsCompleted[0] = true;
    }

    private getQuestionType() {
        return (
            <fieldset id={styles.type_options} className={styles.about_question} style={{ display: this.displayOfSteps[0] }} onChange={this.handleTypeChange.bind(this)} >
                <div>
                    <input type="radio" name="option" id={styles.first_option} value="type1" />
                    <label >আমার নিজস্য কারিকুলাম সম্পর্কিত সমস্যা সমাধান করতে চাই</label>
                </div>
                <div>
                    <input type="radio" name="option" id={styles.second_option} value="type2" />
                    <label >আমার বাড়ির কাজের সমস্যা সমাধান করতে চাই</label>
                </div>

                <div>
                    <input type="radio" name="option" id={styles.third_option} value="type3" />
                    <label >শিক্ষা সম্পর্কিত তথ্য জানতে চাই</label>
                </div>
                <div>
                    <input type="radio" name="option" id={styles.fourth_option} value="type4" />
                    <label >শিক্ষা সম্পর্কিত উপদেশ চাই</label>
                </div>

                <div>
                    <input type="radio" name="option" id={styles.fifth_option} value="type5" />
                    <label>অন্যান্য</label>
                </div>
            </fieldset>
        );
    }



    private getGuidDiv() {
        return (
            <div className={styles.guidDiv+" "+ styles.description+" "+ styles.review} style={{ display: this.state.currentStep === 4 ? this.displayOfSteps[4] : this.displayOfSteps[5] }}>
                <div className={styles.questionPart}>
                    <div className={styles.titleField}>
                        <span>১.প্রশ্নের বর্ণনা(আবশ্যক)</span>
                    </div>
                    <div className={styles.inputField}>
                        <textarea name="" id="" cols={30} rows={8} onChange={this.saveDescription.bind(this)}></textarea>
                    </div>
                </div>
            </div>

        )
    }

    private saveDescription(event: any) {
        console.log('saved description');
        this.data.description = event.target.value;
        this.stepsCompleted[4] = this.data.description ? true : false;
    }

    private getSimilarQuestion() {
        if (this.state.loadSimilarities) return <Loader/>;
        return (

            <div className={styles.similar_question_list}>
                {
                    this.similarQuestions.map((q, index) => <Question key={index + "similarQuestionItem"} data={q} />)
                }
            </div>

        )
    }


    private getHead() {
        return (
            <div id={styles.stages}>
                <span onClick={() => { this.changeStep(0) }} style={this.state.currentStep === 0 ? this.getActivedTabStyle() : this.getDeactivatedStyle()}>প্রশ্নের ধরণ</span>
                <span onClick={() => { this.changeStep(1) }} style={this.state.currentStep === 1 ? this.getActivedTabStyle() : this.getDeactivatedStyle()}>ট্যাগ</span>
                <span onClick={() => { this.changeStep(2) }} style={this.state.currentStep === 2 ? this.getActivedTabStyle() : this.getDeactivatedStyle()}>শিরোনাম</span>
                <span onClick={() => { this.changeStep(4) }} style={this.state.currentStep === 4 ? this.getActivedTabStyle() : this.getDeactivatedStyle()}>বর্ণনা</span>
                <span onClick={() => { this.changeStep(5) }} style={this.state.currentStep === 5 ? this.getActivedTabStyle() : this.getDeactivatedStyle()}>পরিদর্শন</span>
            </div>
        )
    }

    private getActivedTabStyle() {
        return {
            background: this.activeTabBackground,
            color: 'white'
        }
    }

    private getDeactivatedStyle() {
        return {
            background: '',
            color: this.activeTabBackground
        }
    }


}