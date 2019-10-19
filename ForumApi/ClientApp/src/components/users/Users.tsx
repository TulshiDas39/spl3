import React, { Component } from 'react';
import { Pagination } from '../pagination/Pagination';
import { Leftbar } from '../leftbar/Leftbar';
import { Head } from './subComponents/Head';
import { UserContainer } from './subComponents/UserContainer';
import "./users.css";

export class Users extends Component {
    static displayName = Users.name;

    public render(): JSX.Element {
        return (
            <div id="parentDiv">
                <Leftbar />
                <div id="users-right">
                    <Head />
                    <UserContainer />
                    <Pagination />
                </div>
            </div>
        );
    }
}
