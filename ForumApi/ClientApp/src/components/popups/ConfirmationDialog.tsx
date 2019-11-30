import React, { Component } from "react";
import Popup from "reactjs-popup";
import { ConfirmationDialogProps } from "./Types";
import "./popup.css";

export class ConfirmationDialog extends Component<ConfirmationDialogProps, any>{

    render() {
        return (
            <Popup trigger={this.props.children} modal >
                {close => (
                    <div className="modal">
                        <span className="close" onClick={close}>&times;</span>
                        <div className="header"> {this.props.title} </div>

                        <div className="actions">
                            <button className="button" onClick={() => {
                                close();
                                this.props.onConfirm();
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