import React, { Component } from "react";
import Popup from "reactjs-popup";
import { ConfirmationDialogProps } from "./Types";
import styles from "./popup.module.scss";

export class ConfirmationDialog extends Component<ConfirmationDialogProps, any>{

    render() {
        return (
            <Popup trigger={this.props.children} modal >
                {close => (
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={close}>&times;</span>
                        <div className={styles.header}> {this.props.title} </div>

                        <div className={styles.actions}>
                            <button className={styles.button} onClick={() => {
                                close();
                                this.props.onConfirm();
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