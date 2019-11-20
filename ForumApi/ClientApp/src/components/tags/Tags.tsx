import React, { Component } from "react";
import { Leftbar } from "../leftbar/Leftbar";
import { Head } from "./subComponents/Head";
import { TagContainer } from "./subComponents/TagContainer";
import { Pagination } from "../pagination/Pagination";
import "./tags.css";
import { ITag } from "../../utils/Models";

interface state{
    isLoading:boolean;
}
export class Tags extends Component<any, state>{

    constructor(props:any){
        super(props);
        this.state = {isLoading:false};
    }

    private newTag?:ITag;

    private eventNext(){

    }

    private eventPrev(){

    }

    private insertNewTag(newTag:ITag){
        this.newTag = newTag;
        console.log('inserting new tag:');
        console.log(this.newTag);
        this.setState(this.state);
    }

    public render() {
        return (
            <div id="tags-parentDiv">
                <Leftbar />
                <div id="tags-right">
                    <Head onNewTagCreated={this.insertNewTag.bind(this)}/>
                    <TagContainer newTag={this.newTag}/>
                    <Pagination eventNext ={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />
                </div>
            </div>
        );
    }
}