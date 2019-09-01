import React, { Component } from "react";
import { Leftbar } from "../elements/leftbar/Leftbar";
import { Head } from "./subComponents/Head";
import { TagContainer } from "./subComponents/TagContainer";
import { Pagination } from "../elements/pagination/Pagination";
import "./tags.css";

export class Tags extends Component<any, any>{

    public render() {
        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="right">
                    <Head />
                    <TagContainer />
                    <Pagination />
                </div>

            </div>
        );
    }
}