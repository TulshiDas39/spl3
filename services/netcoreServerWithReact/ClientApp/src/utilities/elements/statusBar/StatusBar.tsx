import React, { Component } from "react";
import "./statusBar.css";

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
                    <a href="">অষ্টম শ্রেণী</a>
                    <a href="">পাটীগণিত</a>
                    <a href="">বীজগণিত</a>
                </div>
            </div>
        )

    }
}