import React, { Component } from "react";
import "./statusBar.scss";

export class StatusBar extends Component<any, any>{

    public render() {
        return (
            <div id="status_bar">
                <div id="info_title">
                    <span>তথ্য</span>
                </div>
                <div id="info">
                    <span className="fa fa-info-circle"></span>
                    <span>সমীকরণ এখন ডেভেলাপমেন্টের আওতাধীন</span>
                </div>
                <div id="tag_title">
                    <span>অনুসরণকৃত বিষয়</span>
                </div>
                <div id="tags">
                    <span >অষ্টম শ্রেণী</span>
                    <span >পাটীগণিত</span>
                    <span >বীজগণিত</span>
                </div>
            </div>
        )

    }
}