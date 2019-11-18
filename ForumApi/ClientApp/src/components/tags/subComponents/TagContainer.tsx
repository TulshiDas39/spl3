import React, { Component } from "react";
import "./tagContainer.css";
import { Loader } from "../../loader/loader";
import { ITagInfo, IAuth0Context } from "../../../utils/Structures";
import { tagService } from "./TagService";
import { utilityService } from "../../../services/UtilityService";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Auth0Context } from "../../../utils/Contexts";
import { IUser } from "../../../utils/Models";
import { rootService } from "../../../services/RootService";

interface state {
    isLoading: boolean;
}

export class TagContainer extends Component<any, state>{

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

    async fetchData() {
        try {
            this.tagInofList = await tagService.getTagInfoList(this.iteration);
            this.userInfo = await rootService.getUser(this.context.user.sub);
            console.log('user info');
            console.log(this.userInfo);
            this.setState({ isLoading: false });
        } catch (err) {
            console.error(err);
        }
    }

    private showTagInfoList() {
        tagService.getTagInfoList(this.iteration).then(data => {
            this.tagInofList = data;
            this.setState({ isLoading: false });
        });
    }

    private isFollowing(tagName: string) {
        console.log('user tags:'+this.userInfo.tags);
        let userTags = utilityService.tokenize(this.userInfo.tags);
        console.log(userTags);
        console.log("tagname:"+tagName);
        let index = userTags.indexOf(tagName);
        console.log('index:'+index);
        if (index == -1) return false;
        return true;
    }

    private async followTag(tagInfo:ITagInfo){
        let token = await this.context.getTokenSilently();
        tagService.followTag(tagInfo.tag.id, this.context.user.sub, token).then(data=>{
            this.fetchData();
        });
    }

    private async unFollowTag(tagInfo:ITagInfo){
        let token = await this.context.getTokenSilently();
        tagService.unFollowTag(tagInfo.tag.id, this.context.user.sub,token).then(data=>{
            this.fetchData();
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
            <div className="tagItem" key={"tag" + tagInfo.tag.id}>
                <div className="tagHead">
                    <div className="tag">
                        {tagInfo.tag.name}
                    </div>
                    {this.getFollowIcon(tagInfo)}
                </div>

                <span>{utilityService.convertToBengaliText(tagInfo.tag.users)} ব্যাবহারকারী </span>
                <span>প্রশ্ন আজ {utilityService.convertToBengaliText(tagInfo.questionsToday)}, এই সপ্তাহে {utilityService.convertToBengaliText(tagInfo.questionsInthisWeek)}</span>
            </div>

        )
    }

    private getFollowIcon(tagInfo: ITagInfo) {
        if (!this.context.isAuthenticated) return;

        if (this.isFollowing(tagInfo.tag.name)) return <VisibilityIcon titleAccess="un follow this tag" className="followIcon" onClick={()=>this.unFollowTag(tagInfo)}></ VisibilityIcon>
        return <VisibilityOffIcon  titleAccess="follow this tag" className="followIcon" onClick={()=>this.followTag(tagInfo)}></VisibilityOffIcon>
    }

}