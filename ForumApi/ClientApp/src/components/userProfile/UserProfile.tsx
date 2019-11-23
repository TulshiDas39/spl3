import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { IUser } from "../../utils/Models";
import { userProfileService } from "./userProfileService";
import { Loader } from "../loader/loader";

interface state{
    isLoading:boolean;
}
export class UserProfile extends Component<RouteComponentProps,state>{

    private user = {} as IUser;
    private userId:string;
    constructor(props:RouteComponentProps){
        super(props);
        this.state = {isLoading:true}
        this.userId = (props.match.params as any).userId;
        console.log('user id:'+this.userId);
    }

    componentDidMount(){
        this.fetchData();
    }

    private fetchData() {
        userProfileService.getUserInfo(this.userId).then(data=>{
            this.user = data;
            console.log('user profile:');
            console.log(data);
            this.setState({isLoading:false});
        })
    }

    render(){
        if(this.state.isLoading) return <Loader />;

        return (
            <h1>making</h1>
        )
    }
}