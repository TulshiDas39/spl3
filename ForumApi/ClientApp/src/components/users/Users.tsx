import React, { Component } from 'react';
import { Pagination } from '../pagination/Pagination';
import { Leftbar } from '../leftbar/Leftbar';
import { Head } from './subComponents/Head';
import { UserContainer } from './subComponents/UserContainer';
import "./users.scss";
import { Loader } from '../loader/loader';
import { IUser } from '../../utils/Models';
import { userService } from './UserService';
import { httpService } from '../../services/HttpService';
import { API_CALLS } from '../../utils/api_calls';

interface state {
    isLoading: boolean;
}

export class Users extends Component<any, state> {

    private iteration = 0;
    static displayName = Users.name;

    private users:IUser[] =[];

    constructor(props: any) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount(){
        this.fetchData();
    }
    
    private fetchData(){
        userService.getUsers(this.iteration).then(data=>{
            this.users = data;
            this.setState({isLoading:false});
        },err=>{
            console.error(err);
        })
    }


    private eventNext() {
        if(this.users.length > 0) {
            this.iteration++;
            this.fetchData();
        }
    }

    private eventPrev() {
        if(this.iteration>0){
            this.iteration--;
            this.fetchData();
        }
    }

    private searchUser(event: React.ChangeEvent<HTMLInputElement>){
        let searchVal = event.target.value;
        if(!searchVal) {
            this.fetchData();
            return;
        }
        
        httpService.get(API_CALLS.searchUsers+searchVal).then(data=>{
            this.users = data;
            this.setState(this.state);
        })
    }

    public render(): JSX.Element {
        if (this.state.isLoading) return (
            <div style={{textAlign:'center',marginTop:'10px'}}>
                <Loader />
            </div>
        )
        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="users-right">
                    <Head handleSearchUser={this.searchUser.bind(this)}/>
                    <UserContainer users = {this.users}/>
                    <Pagination eventNext={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />
                </div>
            </div>
        );
    }
}
