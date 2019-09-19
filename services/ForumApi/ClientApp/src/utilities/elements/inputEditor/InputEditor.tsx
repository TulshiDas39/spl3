import React, { Component } from "react";
import "./inputEditor.css";

export class InputEditor extends Component<any, any>{
    public render() {
        return (
            <div>
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
                    <textarea name="" id="answer_editor" cols={30} rows={10} ></textarea>

                </div>
                <div id="answer_display">
                </div>
            </div>

        );
    }
}