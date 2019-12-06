import React, { Component } from "react";
import styles from "./user.module.scss";
import { IUserProps } from "../Types";
import { utilityService } from "../../../services/UtilityService";
import { Link } from "react-router-dom";

export class User extends Component<IUserProps, any>{

    private getTagStr(tags: string) {
        let tagStr = "";
        let splittedTags = utilityService.tokenize(tags);
        for (let i = 0; i < splittedTags.length; i++) {
            if (i > 3) {
                tagStr += "..";
                break;
            }
            tagStr += splittedTags[i] + ",";
        }

        return tagStr;
    }

    private compressUserName(name:string){
        if(name.length <20 )return name;

        let splits = utilityService.tokenize(name);
        let compressedName = splits[0]+". "+splits[1];
        if(compressedName.length < 20) return compressedName;

        return compressedName.substring(0,20);
    }

    public render() {
        console.log('userInfo:');
        console.log(this.props.data);
        return (
            <div className={styles.user}>
                <div className={styles.user_img}>
                    <img src={this.props.data.image} alt="" />
                </div>
                <div className={styles.user_info}>
                    <Link to={"/profile/"+this.props.data.id} title={this.props.data.name} className={styles.user_info_name}>{this.compressUserName(this.props.data.name)}</Link>
                    <span title="reputation" className={styles.user_info_rating}>{this.props.data.reputation}</span>
                    <span className={styles.user_info_tags}>{this.getTagStr(this.props.data.tags)}</span>
                </div>
            </div>
        );
    }
}