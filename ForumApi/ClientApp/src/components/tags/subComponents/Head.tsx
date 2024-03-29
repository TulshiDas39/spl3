import React, { Component } from "react";
import styles from "./head.module.scss";
import { InputDialog } from "../../popups/InputDialog";
import { Auth0Context } from "../../../utils/Contexts";
import { tagService } from "../TagService";
import { ITagListHeadProps } from "../Types";
import { ITagInfo } from "../../../utils/Structures";

export class Head extends Component<ITagListHeadProps, any>{

    static contextType = Auth0Context;

    private async postNewTag(newTag: string) {
        if (!newTag) return;
        tagService.postNewTag(newTag, this.context.token).then(data => {
            let tagInfo: ITagInfo = {
                questionsInthisWeek: 0,
                questionsToday: 0,
                tag: data
            }
            this.props.onNewTagCreated(tagInfo);
        }, err => {
            console.error(err);
        })
    }

    public render() {
        return (
            <div id={styles.headArea}>
                <h1>বিষয়সমুহ</h1>
                <p>বিষয় সমুহ এখানে উল্লেখ করা হল</p>
                <div id={styles.tagFilterContainer}>
                    <div id={styles.filter_search}>
                        <div className={styles.searchFilterDiv}>
                            <span className="fa fa-search"></span>
                            <input type="text" placeholder="খুজুন..." onChange={this.props.onSearch}/>
                        </div>
                    </div>
                    {this.getNewTagBtn()}
                </div>

            </div>
        );
    }

    private getNewTagBtn() {
        if (this.context.isAuthenticated) return (
            <InputDialog title="Enter new Tag name" onInput={this.postNewTag.bind(this)}>
                <button className={styles.newTagBtn}>নতুন ট্যাগ</button>
            </InputDialog>
        )
    }
}