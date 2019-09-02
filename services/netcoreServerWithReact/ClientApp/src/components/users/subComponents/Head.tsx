import React, { Component } from "react";
import "./head.css";
import { TagInput } from "../../elements/reactTagEditor/TagInput";

export class Head extends Component<any, any>{

    public render() {
        return (
            <div id="headArea">
                <h1>ব্যবহারকারী</h1>
                <p>ব্যবহারকারী এখানে উল্লেখ করা হল</p>

                <div className="searchAndFilters">

                    <div className="filter-search filter-item">
                        <form >
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder="নাম..."/>
                        </form>
                    </div>
                    
                    <div id="filterByPlaceContainer" className="filter-search filter-item">
                        <form>
                            <input type="text" placeholder="স্থান..."/>
                        </form>
                    </div>

                    {/* <div id="filterTags" className="filter-item">
                        <div className="filterTagDiv">
                            <textarea id="hero-demo"></textarea>
                        </div>
                    </div> */}

                    <TagInput/>

                </div>

            </div>    
        );
    }
}