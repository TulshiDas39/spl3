import React, { Component } from 'react';
import { Pagination } from '../pagination/Pagination';
import { Leftbar } from '../leftbar/Leftbar';
import { Head } from './subComponents/Head';
import { UserContainer } from './subComponents/UserContainer';
import "./users.css";
import { Loader } from '../loader/loader';
import { IUser } from '../../utils/Models';
import { userService } from './UserService';

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

    }

    private eventPrev() {

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
                    <Head />
                    <UserContainer users = {this.users}/>
                    <Pagination eventNext={this.eventNext.bind(this)} eventPrev={this.eventPrev.bind(this)} />
                </div>
            </div>
        );
    }
}
