import React, { Component } from 'react';
import Nav from '../nav/Nav';
import { Auth0Context } from '../../utils/Contexts';
import { Footer } from '../footer/Foter';
import styles from "./appLayout.module.scss";
import { Leftbar } from '../leftbar/Leftbar';
export class AppLayout extends Component {
    static displayName = AppLayout.name;

    static contextType = Auth0Context;

    render() {
        return (
            <div id="parentDiv">
                <Leftbar />
                {this.props.children}
            </div>
        );
    }
}
