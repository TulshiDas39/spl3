import React, { Component } from "react";
import styles from "./pagination.module.scss";

interface props{
    eventNext():void;
    eventPrev():void;
}

export class Pagination extends Component<props, any>{

    public render() {
        return (
            <div className={styles.pagination}>
                <span className={styles.pagination_btn} onClick={this.props.eventPrev}>prev</span>
                <span className={styles.pagination_btn} onClick={this.props.eventNext}>next</span>
            </div>

        )
    }
}