import React, { Component } from "react";
import { Leftbar } from "../elements/leftbar/Leftbar";
import { Profile } from "./subComponents/Profile";
import "./userActivity.css";
import { Activity } from "./subComponents/Activity";

interface state{
    display:string;
}

export class UserActivity extends Component<any, state>{

    constructor(props:any){
        super(props);
        this.state = {
            display:'none'
        }
        this.toogleView = this.toogleView.bind(this);
    }

    public render() {
        return (
            <div className="mainContainer">
                <Leftbar />
                <div className="right">
                    <div className="head-bar">
                        <span className="user-profile">প্রোফাইল</span>
                        <span className="user-activity" onClick={this.toogleView}>সক্রিয়তা</span>
                        <span className="user-story">ব্যবহারকারী বিবরণ</span>
                    </div>

                    {/* <Profile /> */}
                    {new Activity(this).getActivities()}
                </div>

            </div>
        )
    }

    private toogleView(){
        if(this.state.display == 'none') this.setState({display:''});
        else this.setState({
            display:'none'
        })
    }
}