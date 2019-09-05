import React, { Component } from "react";
import { InputEditor } from "../../utilities/elements/inputEditor/InputEditor";
import { TagInput } from "../../utilities/elements/reactTagEditor/TagInput";
import { COUNTRIES } from "../../utilities/elements/reactTagEditor/countries";

interface state {
    tags: {
        id: string,
        text: string
    }[],
    suggestions: string[]
}

export class Ask extends Component<{}, state>{

    constructor(props:any){
        super(props);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            tags: [{ id: '1', text: "Thailand" }, { id: '2', text: "India" }],
            suggestions: COUNTRIES
        }

    }

    public render() {
        return (
            <div>
                {this.getHead()}
                <div id="middle">
                    <span id="image" className="fa fa-question-circle"> </span>
                    {this.getSteps()}
                </div>
            </div>
        )
    }

    private getSteps() {
        return (
            <div id="steps">
                <h1 id="type" className="about_question">আপনার কী ধরনের প্রশ্ন রয়েছে?</h1>
                <span id="suggest" className="about_question">আপনাকে সঠিক উত্তর প্রদান করতে আমরা সর্বোচ্চ চেষ্টা করব</span>

                {this.getQuestionType()}
                <h1 className="review" style={{ display: 'none' }}>আপনার প্রশ্নটি পরিদর্শন করে নিন</h1>
                <span className="review" style={{ display: 'none' }}>সবকিছু আরেকবার দেখে নিন, কোন ভুল থাকলে তা এখানে সংসোধন করে নিতে পারেন</span>

                <h1 className="titleDiv" style={{ display: 'none' }}>আপনার প্রশ্নের শিরোনাম দিন</h1>
                <span id="title_tips" className="titleDiv" style={{ display: 'none' }}>প্রশ্নের শিরোনামের মাধ্যমে প্রশ্নের প্রাথমিক অর্থ প্রকাশ পায়,
                ফলে উত্তর প্রদান সহজ হয়</span>
                <h4 id="title_level" className="titleDiv review" style={{ display: 'none' }}>শিরোনাম</h4>
                <input id="title_input" type="text" name="" className="titleDiv review" style={{ display: 'none' }} />


                <h1 className="ask_tags" style={{ display: 'none', marginBottom: 0 }}>আপনি কোন শ্রেণীর কারিকুলাম, বিষয়, অনুশীলনী বা সমস্যা নিয়ে প্রশ্ন
                করতে চান?</h1>
                <span className="ask_tags" style={{ display: 'none', marginTop: '20px 0' }}>
                    ট্যাগ এর মাধ্যমে সঠিক ব্যাক্তি আপনার প্রশ্নটি পেয়ে থাকেন এবং উত্তর দিয়ে থাকেন
                </span>
                <span style={{ fontWeight: 'bold', display: 'none', marginTop: '20px' }} className="ask_tags review">ট্যাগ</span>

                {new TagInput().build(this.handleAddition,this.handleDelete,{tags:this.state.tags,
                    suggestions:this.state.suggestions})}

                {/* <div id="titleDiv" style="display: none;"></div>  */}



                <div id="similarityDiv" className="similarity_check" style={{ display: 'none' }}>
                    <h1>আপনার প্রশ্নের উত্তর কি এখানে আছে?</h1>
                    <span>এখানে আপনার প্রশ্নের সমতুল্য প্রশ্ন থাকতে পারে</span>
                </div>
                <div id="guid" className="description" style={{ display: 'none' }}>
                    <h1>প্রশ্ন সম্পর্কে বিস্তারিত তথ্য দিন</h1>
                    <span>প্রশ্নের বর্ণনা উত্তর প্রদানে প্রয়োজনীয় তথ্য সর্বরাহ করে থাকে</span>
                </div>
                <div className="similar_questions similarity_check" style={{ display: 'none' }}>
                    <div className="head_space">
                        <span style={{ padding: '0 5px' }}>Similar question</span>
                    </div>

                    {this.getSimilarQuestion()}

                </div>

                {this.getGuidDiv()}

                <div id="btnDiv">
                    <button id="prevBtn" className="btns">পুর্ববর্তী ধাপ</button>
                    <button id="nextBtn" className="btns">পরবর্তী ধাপ</button>
                </div>

            </div>
        )
    }

    public handleDelete(i: number) {
        this.setState({
            tags: this.state.tags.filter((tag, index) => index !== i),
        });
        console.log('delete ' + i);
    }

    public handleAddition(tag: string) {

        let { tags } = this.state;
        if (tags.map(val => val.text).indexOf(tag) === -1) {
            this.setState({ tags: [...tags, { id: (tags.length + 1) + "", text: tag }] });
            console.log('added ' + tag);
        }


    }

    private getQuestionType() {
        return (
            <fieldset id="type_options" className="about_question">
                <div>
                    <input type="radio" name="option" id="first_option" />
                    <label >আমার নিজস্য কারিকুলাম সম্পর্কিত সমস্যা সমাধান করতে চাই</label>
                </div>
                <div>
                    <input type="radio" name="option" id="second_option" />
                    <label >আমার বাড়ির কাজের সমস্যা সমাধান করতে চাই</label>
                </div>

                <div>
                    <input type="radio" name="option" id="third_option" />
                    <label >শিক্ষা সম্পর্কিত তথ্য জানতে চাই</label>
                </div>
                <div>
                    <input type="radio" name="option" id="fourth_option" />
                    <label >শিক্ষা সম্পর্কিত উপদেশ চাই</label>
                </div>

                <div>
                    <input type="radio" name="option" id="fifth_option" />
                    <label >অন্যান্য</label>
                </div>
            </fieldset>
        )
    }

    private getGuidDiv() {
        return (
            <div className="guidDiv description review" style={{ display: 'none' }}>
                <div className="questionPart">
                    <div className="titleField">
                        <span>১.প্রশ্নের বর্ণনা(আবশ্যক)</span>
                    </div>
                    <div className="inputField">
                        <textarea name="" id="" cols={30} rows={8}></textarea>
                    </div>
                </div>
                <div className="questionPart question_image">
                    <div className="titleField">
                        <span>২.ছবি(অনাবশ্যক)</span>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="questionPart expectation">
                    <div className="titleField">
                        <span>৩.উপসংহার দিন(আবশ্যক)</span>
                    </div>
                    <div className="inputField">
                        <textarea name="" id="" cols={30} rows={8}></textarea>
                    </div>
                </div>
            </div>


        )
    }



    private getSimilarQuestion() {
        return (
            <div className="similar_question_list">
                {this.getSingleQuestion()}
                {this.getSingleQuestion()}
                {this.getSingleQuestion()}
                {this.getSingleQuestion()}
            </div>

        )
    }

    private getSingleQuestion() {
        return (
            <div className="questions">
                <div className="question_status">
                    <a href="" className="votes">
                        <span className="vote_number">
                            ৫
                                </span>
                        <span className="vote_text">
                            ভোট
                                </span>
                    </a>
                    <a href="" className="answered">
                        <span className="answer_number">
                            ৬
                                </span>
                        <span className="answer_text">
                            উত্তর
                                </span>
                    </a>
                    <a href="" className="views">
                        <span className="view_number">
                            ৪০
                                </span>
                        <span className="view_text">
                            দেখা
                                </span>
                    </a>
                </div>

                <div className="question_text">
                    <a className="question_title" href="">
                        কোথায় প্রশ্ন করা যায়?
                            </a>
                    <div className="question_tags">
                        <a href="">javascript</a>
                        <a href="">jquery</a>
                        <a href="">typescript</a>
                        <a href="">electron</a>
                    </div>
                    <div className="question_time">
                        <a href="">তিন ঘন্টা আগে প্রশ্ন করেছেন</a>
                        <a href="">তুলশী দাস</a>
                        <span>১০৩৯</span>
                    </div>
                </div>
            </div>


        )
    }


    private getHead() {
        return (
            <div id="stages">
                <span>প্রশ্নের ধরণ</span>
                <span>ট্যাগ</span>
                <span>শিরোনাম</span>
                <span>বর্ণনা</span>
                <span>পরিদর্শন</span>
            </div>
        )
    }
}