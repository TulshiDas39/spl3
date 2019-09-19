import React, { Component } from "react";
import { Leftbar } from "../../utilities/elements/leftbar/Leftbar";
import { Head } from "./subComponents/Head";
import { TagContainer } from "./subComponents/TagContainer";
import { Pagination } from "../../utilities/elements/pagination/Pagination";
import "./tags.css";

export class Tags extends Component<any, any>{

    public render() {
        return (
            <div id="tags-parentDiv">
                <Leftbar />
                <div id="tags-right">
                    <Head />
                    <TagContainer />
                    <Pagination />
                </div>
            </div>
        );
    }
}