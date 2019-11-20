import React, { Component } from "react";
import { Leftbar } from "../leftbar/Leftbar";
import { Head } from "./subComponents/Head";
import { TagContainer } from "./subComponents/TagContainer";
import { Pagination } from "../pagination/Pagination";
import "./tags.css";
import { ITag, IUser } from "../../utils/Models";
import { ITagInfo } from "../../utils/Structures";
import { tagService } from "./TagService";
import { rootService } from "../../services/RootService";
import {Auth0Context} from "../../utils/Contexts";
import { Loader } from "../loader/loader";

interface state {
    isLoading: boolean;
}
export class Tags extends Component<any, state>{

    private tagInofList: ITagInfo[] = [];
    private iteration = 0;
    private userInfo = {} as IUser;
    static contextType = Auth0Context;

    constructor(props: any) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.fetchData();
    }

    private searchTags(event:React.ChangeEvent<HTMLInputElement>){
        let searchVal = event.target.value;
        if(!searchVal) this.fetchData();
        else tagService.getSearchResult(searchVal).then(data=>{
            this.tagInofList = data;
            this.setState(this.state);
        });

    }

    async fetchData() {
        try {
            this.tagInofList = await tagService.getTagInfoList(this.iteration);
            if(this.context.isAuthenticated) this.userInfo = await rootService.getUser(this.context.user.sub);
            console.log('user info');
            console.log(this.userInfo);
            this.setState({ isLoading: false });
        } catch (err) {
            console.error(err);
        }
    }

    private eventNext() {

    }

    private eventPrev() {

    }

    private insertNewTag(newTag: ITagInfo) {
        this.tagInofList.push(newTag);
        console.log('inserting new tag:');
        this.setState(this.state);
    }

    public render() {
        if(this.state.isLoading) return <Loader />;
        return (
            <div id="tags-parentDiv">
                <Leftbar />
                <div id="tags-right">
                    <Head onNewTagCreated={this.insertNewTag.bind(this)} onSearch={this.searchTags.bind(this)}/>
                    <TagContainer tagsInfo={this.tagInofList} userInfo={this.userInfo} onUpdate={this.fetchData.bind(this)}/>
                    <Pagination eventNext={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />
                </div>
            </div>
        );
    }
}