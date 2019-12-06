import React, { Component } from "react";
import Popup from "reactjs-popup";
import {InputDialogProps } from "./Types";
import styles from "./popup.module.scss";

export class InputDialog extends Component<InputDialogProps, any>{

    private inputValue = "";

    private onInput(event:any){
        this.inputValue = event.target.value;
    }

    render() {
        return (
            <Popup trigger={this.props.children} modal >
                {close => (
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={close} >&times;</span>
                        <div className={styles.header}> {this.props.title} </div>
                        <input className={styles.inputBoxPopup} type="text" onChange={this.onInput.bind(this)} />
                        <div className={styles.actions}>
                            <button className={styles.button} onClick={() => {
                                close();
                                this.props.onInput(this.inputValue);
                            }} >Confirm
                                </button>
                            <button
                                className={styles.button}
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