import React, { Component } from "react";
import { utilityService } from "../../services/UtilityService";
import { IVoteProps } from "./Types";
import styles from "./vote.module.scss";

export class Vote extends Component<IVoteProps, any>{

    render() {

        let upVoteBtnColor = 'black';
        let downVoteBtnColor = 'black';
        if(this.props.voteStatus) upVoteBtnColor = 'blue';
        else if(this.props.voteStatus === false) downVoteBtnColor = 'blue';
        return (
            <div id={styles.question_vote} className={styles.vote_system}>
                <span className={"fa fa-sort-asc "+styles.vote_icon} style={{ color: upVoteBtnColor }} onClick={() => this.props.vote(true)}></span>
                <span>{utilityService.convertToBengaliText(this.props.ratings)}</span>
                <span className={"fa fa-sort-desc "+ styles.vote_icon} style={{ color: downVoteBtnColor }} onClick={() => this.props.vote(false)}></span>
            </div>

        );
    }
}