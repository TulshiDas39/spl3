import React, { Component } from "react";
import "./user.css";
import { IUserProps } from "../Types";
import { utilityService } from "../../../services/UtilityService";

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
            <div className="user">
                <div className="user-img">
                    <img src={this.props.data.image} alt="" />
                </div>
                <div className="user-info">
                    <span title={this.props.data.name} className="user-info-name">{this.compressUserName(this.props.data.name)}</span>
                    {/* <span className="user-info-place">New york, united states</span> */}
                    <span title="reputation" className="user-info-rating">{this.props.data.reputation}</span>
                    <span className="user-info-tags">{this.getTagStr(this.props.data.tags)}</span>
                </div>
            </div>
        );
    }
}