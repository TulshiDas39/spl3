import React, { Component } from "react";
import Popup from "reactjs-popup";
import {InputDialogProps } from "./Types";
import "./popup.css";

export class InputDialog extends Component<InputDialogProps, any>{

    private inputValue = "";

    constructor(props: InputDialogProps) {
        super(props);
    }

    private onInput(event:any){
        this.inputValue = event.target.value;
    }

    render() {
        return (
            <Popup trigger={this.props.children} modal >
                {close => (
                    <div className="modal">
                        <a className="close" onClick={close}>&times;</a>
                        <div className="header"> {this.props.title} </div>
                        <input className="inputBoxPopup" type="text" onChange={this.onInput.bind(this)} />
                        <div className="actions">
                            <button className="button" onClick={() => {
                                close();
                                this.props.onInput(this.inputValue);
                            }} >Confirm
                                </button>
                            <button
                                className="button"
                                onClick={() => {
                                    console.log("modal closed ");
                                    close();
                                }}
                            >
                                close
                            </button>
                        </div>
                    </div>
                )}
            </Popup >
        )
    }
}