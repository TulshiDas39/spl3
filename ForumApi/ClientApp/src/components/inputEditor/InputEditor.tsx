import React, { Component, RefObject } from "react";
//import {InputHandler} from "./InputHandler";
import "./inputEditor.css";
import { Editor } from "../answer/editor";

interface state {
    input: string;
}

interface props{
    id:string;
}
export class InputEditor extends Component<props, state>{

    private inputText: string = "";

    private inputEditor = React.createRef<HTMLDivElement>();

    constructor(props: props) {
        super(props);
        this.state = { input: "" };
    }

    componentDidMount(){
        new Editor(this.inputEditor.current as HTMLDivElement);
    }

    public render() {
        return (
            <div className="Input_editor_pane" ref={this.inputEditor}>
                <div className="answer_editor">
                    <div className="answer_editor_topbar">
                        <span id="boldBtn" className="answer_editor_topbar_bold fa fa-bold boldBtn" title="bold text">
                        </span>
                        <span id="italicBtn" className="answer_editor_topbar_italic fa fa-italic"
                            title="italic text">
                        </span>
                        <span id="linkBtn" className="answer_editor_topbar_hyperlink fa fa-link" title="hyperlink">
                        </span>
                        <span id="tabBtn" className="fa fa-indent tabBtn" title="insert tab">
                        </span>
                        <span id="orderListBtn" className="fa fa-list-ol orderListBtn" title="order list">
                        </span>
                        <span id="unorderListBtn" className="fa fa-list-ul unorderListBtn" title="unorder list">
                        </span>
                        <span id="imageUpload" className="fa fa-photo imageUpload" title="upload image">
                            <input id="imageUploader" className="imageUploader" style={{ display: 'none' }} type="file" accept="image/*" />
                        </span>
                        <span id="headingBtn" className="fa fa-align-center headingBtn" title="heading text">
                        </span>
                        <span id="newLineBtn" className="fa fa-level-down newLineBtn" title="new line">
                        </span>
                    </div>
                    <textarea className="inputArea" onClick={this.focus.bind(this)} name="" id="answer_editor" cols={30} rows={10} onChange={this.showInputText.bind(this)}></textarea>

                </div>
                <div className="outputArea" id="answer_display" dangerouslySetInnerHTML={{ __html: this.state.input }}>
                </div>

                <div onClick={this.post.bind(this)} id="post_question_btn">উত্তর প্রেরণ করুন</div>
                <p className="testP" ></p>
            </div>

        );
    }

    private focus(){
        
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