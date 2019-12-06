import React, { Component } from "react";
import styles from "./statusBar.module.scss";

export class StatusBar extends Component<any, any>{

    public render() {
        return (
            <div id={styles.status_bar}>
                <div id={styles.info_title}>
                    <span>তথ্য</span>
                </div>
                <div id={styles.info}>
                    <span className="fa fa-info-circle"></span>
                    <span>সমীকরণ এখন ডেভেলাপমেন্টের আওতাধীন</span>
                </div>
                <div id={styles.tag_title}>
                    <span>অনুসরণকৃত বিষয়</span>
                </div>
                <div id={styles.tags}>
                    <span >অষ্টম শ্রেণী</span>
                    <span >পাটীগণিত</span>
                    <span >বীজগণিত</span>
                </div>
            </div>
        )

    }
}