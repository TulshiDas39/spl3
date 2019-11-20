import React, { Component } from "react";
import "./head.css";
import { InputDialog } from "../../popups/InputDialog";
import { Auth0Context } from "../../../utils/Contexts";
import { tagService } from "./TagService";
import { ITagListHeadProps } from "../Types";

export class Head extends Component<ITagListHeadProps, any>{

    static contextType = Auth0Context;

    constructor(props:ITagListHeadProps){
        super(props);
    }

    private async postNewTag(newTag: string) {
        console.log('has come');
        console.log("new tag:" + newTag);
        let token = await this.context.getTokenSilently();
        tagService.postNewTag(newTag,token).then(data=>{
            console.log('new tag created:');
            console.log(data);
            this.props.onNewTagCreated(data);
        })
    }

    public render() {
        return (
            <div id="headArea">
                <h1>বিষয়সমুহ</h1>
                <p>বিষয় সমুহ এখানে উল্লেখ করা হল</p>
                <div id="tagFilterContainer">
                    <div id="filter-search">
                        <form action="/search">
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder="খুজুন..." />
                        </form>
                    </div>
                    {this.getNewTagBtn()}
                </div>

            </div>
        );
    }

    private getNewTagBtn() {
        if (this.context.isAuthenticated) return (
            <InputDialog title="Enter new Tag name" onInput={this.postNewTag.bind(this)}>
                <button className="newTagBtn">নতুন ট্যাগ</button>
            </InputDialog>
        )
    }
}