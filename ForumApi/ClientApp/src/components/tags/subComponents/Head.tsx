import React, { Component } from "react";
import "./head.css";

export class Head extends Component<any, any>{

    public render() {
        return (
            <div id="headArea">
                <h1>বিষয়সমুহ</h1>
                <p>বিষয় সমুহ এখানে উল্লেখ করা হল</p>
                <div id="tagFilterContainer">
                    <div id="filter-search">
                        <form action="/search">
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder="খুজুন..."/>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}