import React, { Component } from "react";
//import {InputHandler} from "./InputHandler";
import "./inputEditor.css";

interface state {
    input: string;
}

interface props{
    id:string;
}
export class InputEditor extends Component<props, state>{

    private inputText: string = "";
    private inputEditor = this.refs.InputEditor;
    // private inputHandler:InputHandler;
    private myRef = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = { input: "" };
        // this.init();
        //   this.inputHandler = new InputHandler(this.inputEditor);
        //this.myRef = React.createRef();
    }

    // init(){
    //     this.myRef.
    // }

    public render() {
        return (
            <div className="Input_editor_pane">
                <div className="answer_editor">
                    <div className="answer_editor_topbar">
                        <span id="boldBtn" className="answer_editor_topbar_bold fa fa-bold" title="bold text">
                        </span>
                        <span id="italicBtn" className="answer_editor_topbar_italic fa fa-italic"
                            title="italic text">
                        </span>
                        <span id="linkBtn" className="answer_editor_topbar_hyperlink fa fa-link" title="hyperlink">
                        </span>
                        <span id="tabBtn" className="fa fa-indent" title="insert tab">
                        </span>
                        <span id="orderListBtn" className="fa fa-list-ol" title="order list">
                        </span>
                        <span id="unorderListBtn" className="fa fa-list-ul" title="unorder list">
                        </span>
                        <span id="imageUpload" className="fa fa-photo" title="upload image">
                            <input id="imageUploader" style={{ display: 'none' }} type="file" accept="image/*" />
                        </span>
                        <span id="headingBtn" className="fa fa-align-center" title="heading text">
                        </span>
                        <span id="newLineBtn" className="fa fa-level-down" title="new line">
                        </span>
                    </div>
                    <textarea name="" id="answer_editor" cols={30} rows={10} onChange={this.showInputText.bind(this)}></textarea>

                </div>
                <div id="answer_display" dangerouslySetInnerHTML={{ __html: this.state.input }}>
                </div>

                <div onClick={this.post.bind(this)} id="post_question_btn">উত্তর প্রেরণ করুন</div>
            </div>

        );
    }

    private post() {

        let data = {
            QuestionId:this.props.id, 
            Description:this.state.input,
            Ratings:0,
            DateTime: new Date().toDateString(),
            UserId:"5d8358193e2c7c281009e8c8"

        };
        console.log('posing answer');

        fetch('api/answers', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: Response) => {
            console.log(res);
            return res.json();
        }).then(data => {
            console.log(data);
            //this.props.history.push('/answer/' + data.id);
        }).catch(err => {
            console.log('error happened');
            console.log(err);
        });

    }

    private showInputText(event: any) {
        //this.inputText= event.target.value;
        this.setState({
            input: event.target.value
        })
    }
}