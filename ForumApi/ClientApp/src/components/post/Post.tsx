import React, { Component } from "react";
import { User } from "../answer/subComponents/User";
import styles from "./post.module.scss";
import { IAnswer, IQuestion, IVote } from "../../utils/Models";
import { Auth0Context } from "../../utils/Contexts";
import { IAuth0Context } from "../../utils/Structures";
import { ConfirmationDialog } from "../popups/ConfirmationDialog";
import { PostType, PostStatus } from "../../utils/Enums";
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
import { utilityService } from "../../services/UtilityService";

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

    componentDidUpdate(prevProps:PostProps){
        if(prevProps !== this.props) this.fetchAllData();
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
            <div id={styles.postDiv}>
                <div className={styles.voteAndAccept}>
                    <Vote {...this.voteInfo} />
                    {this.getAcceptIcon()}
                </div>

                <div id={styles.question_description}>
                    <span className={styles.question_description_text} dangerouslySetInnerHTML={{ __html: this.props.data.description }}></span>
                    {this.getEdit_DeleteOptions()}

                    <User {...this.userProps} />

                    <CommentList postId={this.props.data.id} postType={this.props.type} />
                </div>
            </div>
        )
    }

    private toogleAcceptanceStatus(){
        this.props.data.isAccepted = !this.props.data.isAccepted;
        let headers = utilityService.createHeader(this.context.token);
        httpService.put(API_CALLS.answers,this.props.data,headers).then(data=>{
            debugger;
            if(this.props.onAccept) this.props.onAccept(this.props.data.isAccepted);
        },err=>console.error(err));
    }

    private getAcceptIcon() {
        let context = this.context as IAuth0Context;
        if (this.props.type !== PostType.ANSWER) return;
        if(this.props.questionData){
            if(this.props.questionData.isAccepted && !this.post.isAccepted) return;
        }
        if (!context.isAuthenticated || context.user.sub !== (this.props.questionData as IQuestion).userId) {
            if (this.post.isAccepted) return this.showDisabledAcceptedIcon();
            else return;
        }
        let color = "disabled";
        if (this.post.isAccepted) color = "primary";

        return this.showEnabledAcceptedIcon(color);
    }

    private showEnabledAcceptedIcon(color: string) {
        return (<div className={styles.enableabledIcon} onClick={this.toogleAcceptanceStatus.bind(this)} style={{ padding: '5px' }}>
            <DoneOutlineIcon color={color as any} />
        </div>);
    }

    private showDisabledAcceptedIcon(){
        return (<div style={{ padding: '5px'}}>
            <DoneOutlineIcon color={"primary" as any} />
        </div>);
    }

    private getEdit_DeleteOptions() {
        if (this.isEditable()) {
            return (<div className={styles.edit_delete_options}>
                <span className={styles.edit_option} onClick={this.props.onEdit}>সম্পাদন করুন </span>
                <ConfirmationDialog title="Do you want to delete" onConfirm={this.props.onDelete} onClose={() => { console.log("closed") }}>
                    <span className={styles.delete_option}>মুছুন</span>
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