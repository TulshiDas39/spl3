import React, { Component } from "react";
import { Leftbar } from "../leftbar/Leftbar";
import { Head } from "./subComponents/Head";
import { TagContainer } from "./subComponents/TagContainer";
import { Pagination } from "../pagination/Pagination";
import "./tags.css";

export class Tags extends Component<any, any>{

    private eventNext(){

    }

    private eventPrev(){

    }

    public render() {
        return (
            <div id="tags-parentDiv">
                <Leftbar />
                <div id="tags-right">
                    <Head />
                    <TagContainer />
                    <Pagination eventNext ={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />
                </div>
            </div>
        );
    }
}