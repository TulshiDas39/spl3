import React, { Component } from "react";
import "./tagContainer.css";
import { Loader } from "../../loader/loader";
import { ITagInfo } from "../../../utils/Structures";
import { tagService } from "./TagService";
import { utilityService } from "../../../utils/Utility";

interface state {
    isLoading: boolean;
}
export class TagContainer extends Component<any, state>{

    private tagInofList: ITagInfo[] = [];
    private iteration = 0;
    constructor(props: any) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.showTagInfoList();
    }

    private showTagInfoList() {
        tagService.getTagInfoList(this.iteration).then(data => {
            this.tagInofList = data;
            this.setState({ isLoading: false });
        });
    }

    public render() {
        if (this.state.isLoading) return <Loader />;
        return (
            <div id="tagsContainer">
                {
                    this.tagInofList.map(item => this.getTag(item))
                }
            </div>
        );
    }

    private getTag(tagInfo: ITagInfo) {
        return (
            <div key={"tag " + tagInfo.tag.id} className="tagItem">
                <div className="tag">
                    {tagInfo.tag.name}
                </div>
                <span>{utilityService.convertToBengaliText(tagInfo.tag.users)} ব্যাবহারকারী </span>
                <span>প্রশ্ন আজ {utilityService.convertToBengaliText(tagInfo.questionsToday)}, এই সপ্তাহে {utilityService.convertToBengaliText(tagInfo.questionsInthisWeek)}</span>
            </div>

        )
    }

}