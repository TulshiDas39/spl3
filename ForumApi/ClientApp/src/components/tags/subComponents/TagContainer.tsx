import React, { Component } from "react";
import "./tagContainer.scss";
import { ITagInfo} from "../../../utils/Structures";
import { tagService } from "../TagService";
import { utilityService } from "../../../services/UtilityService";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Auth0Context } from "../../../utils/Contexts";
import { ITagContainer } from "../Types";

interface state {
    isLoading: boolean;
}

export class TagContainer extends Component<ITagContainer, state>{

    //private tagInofList: ITagInfo[] = [];
    //private iteration = 0;
    //private userInfo = {} as IUser;
    //private newTag = {} as ITag;

    static contextType = Auth0Context;
    constructor(props: any) {
        super(props);
        this.state = { isLoading: false };
    }

    // componentDidMount() {
    //     this.fetchData();
    // }

    // pushNewTag() {
    //     if (!this.props.newTag) return;
    //     if (this.props.newTag.id == this.newTag.id) return;

    //     console.log('pushing the new data:');
    //     let newTagInfo: ITagInfo = {
    //         questionsInthisWeek: 0,
    //         questionsToday: 0,
    //         tag: this.props.newTag
    //     }
    //     this.tagInofList.push(newTagInfo);
    //     this.newTag = this.props.newTag;
    // }

    // async fetchData() {
    //     try {
    //         this.tagInofList = await tagService.getTagInfoList(this.iteration);
    //         this.userInfo = await rootService.getUser(this.context.user.sub);
    //         console.log('user info');
    //         console.log(this.userInfo);
    //         this.setState({ isLoading: false });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // private showTagInfoList() {
    //     tagService.getTagInfoList(this.iteration).then(data => {
    //         this.tagInofList = data;
    //         this.setState({ isLoading: false });
    //     });
    // }

    private isFollowing(tagName: string) {
        let userTags = utilityService.tokenize(this.props.userInfo.tags);
        let index = userTags.indexOf(tagName);
        if (index === -1) return false;
        return true;
    }

    private async followTag(tagInfo: ITagInfo) {
        tagService.followTag(tagInfo.tag.id, this.context.user.sub, this.context.token).then(data => {
            //this.fetchData();
            this.props.onUpdate();
        });
    }

    private async unFollowTag(tagInfo: ITagInfo) {
        tagService.unFollowTag(tagInfo.tag.id, this.context.user.sub, this.context.token).then(data => {
            this.props.onUpdate();
        });
    }

    public render() {
        return (
            <div id="tagsContainer">
                {
                    this.props.tagsInfo.map(item => this.getTag(item))
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

        if (this.isFollowing(tagInfo.tag.name)) return <VisibilityIcon titleAccess="un follow this tag" className="followIcon" onClick={() => this.unFollowTag(tagInfo)}></ VisibilityIcon>
        return <VisibilityOffIcon titleAccess="follow this tag" className="followIcon" onClick={() => this.followTag(tagInfo)}></VisibilityOffIcon>
    }

}