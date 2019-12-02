import React, { Component } from "react";
import { User } from "../answer/subComponents/User";
import "./post.css";
import { IAnswer, IQuestion, IVote } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { ConfirmationDialog } from "../popups/ConfirmationDialog";
import { PostType } from "../../utils/Enums";
import { CommentList } from "../commentList/CommentList";
import { PostProps } from "./Types";
import { Vote } from "../vote/Vote";
import { Loader } from "../loader/loader";
import { postService } from "./PostService";
import { IVoteProps } from "../vote/Types";
import { IUserProps } from "../answer/Types";
import { httpService } from "../../services/HttpService";
import { API_CALLS } from "../../utils/api_calls";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

interface state {
    isLoading: boolean;
}

export class Post extends Component<PostProps, state>{

    static contextType = Auth0Context;
    private post: IAnswer | IQuestion;
    private voteInfo = {} as IVoteProps;
    private userProps = {} as IUserProps;

    constructor(props: PostProps) {
        super(props);
        this.post = props.data;
        this.state = { isLoading: true }
        this.init();
    }

    init() {
        this.voteInfo.vote = this.vote.bind(this);
        this.userProps.postTime = this.props.data.datetime;
    }

    componentDidMount() {
        this.fetchAllData();
        let twoMinute = 2000 * 60;
        setInterval(() => this.fetchAllData, twoMinute);
    }

    async fetchAllData() {
        let url = API_CALLS.answers + this.post.id;
        if (this.props.type === PostType.QUESTION) url = API_CALLS.questions + this.post.id;
        this.post = await httpService.get(url);
        this.voteInfo.ratings = this.post.ratings;

        this.userProps.user = await httpService.get(API_CALLS.users + this.post.userId);
        console.log('user:');
        console.log(this.userProps.user);

        if (this.context.isAuthenticated) {
            this.voteInfo.voteStatus = await postService.getVoteStatus(this.post.id, this.post.userId, this.props.type, this.context.token);
        }

        this.setState({ isLoading: false });

    }


    private async vote(type: boolean) {
        let context = this.context as IAuth0Context;

        if (!context.isAuthenticated) return;
        if (this.voteInfo.voteStatus === type) return;

        let vote: IVote = {
            id: undefined as any,
            postId: this.props.data.id,
            postType: this.props.type,
            userId: context.user.sub,
            isUpvote: type
        }

        postService.postVote(context.token, vote).then(data => {
            this.voteInfo.voteStatus = type;
            this.fetchAllData();
        })

    }

    public render() {
        if (this.state.isLoading) return <Loader />;
        return (
            <div id="postDiv">
                <div className="voteAndAccept">
                    <Vote {...this.voteInfo} />
                    {this.getAcceptIcon()}
                </div>

                <div id="question_description">
                    <span className="question_description_text" dangerouslySetInnerHTML={{ __html: this.props.data.description }}></span>
                    {this.getEdit_DeleteOptions()}

                    <User {...this.userProps} />

                    <CommentList postId={this.props.data.id} postType={this.props.type} />
                </div>
            </div>
        )
    }

    private getAcceptIcon() {
        let context = this.context as IAuth0Context;
        if (this.props.type !== PostType.ANSWER) return;
        if (!context.isAuthenticated) return;
        if (context.user.sub !== this.post.userId) return;
        let post = this.post as IAnswer;
        let color = "disabled";
        if (post.isAccepted) color = "primary";

        return (<div style={{ padding: '5px' }}>
                    <DoneOutlineIcon color= {color as any}/>
                </div>);
    }

    private getEdit_DeleteOptions() {
        if (this.isEditable()) {
            return (<div className="edit_delete_options">
                <span className="edit_option" onClick={this.props.onEdit}>সম্পাদন করুন </span>
                <ConfirmationDialog title="Do you want to delete" onConfirm={this.props.onDelete} onClose={() => { console.log("closed") }}>
                    <span className="delete_option">মুছুন</span>
                </ConfirmationDialog>

            </div>
            );
        }
    }

    private isEditable() {
        let context = this.context as IAuth0Context;
        if (context.isAuthenticated) {
            if (context.user.sub === this.props.data.userId) return true;
            return false;
        }

        return false;
    }
}