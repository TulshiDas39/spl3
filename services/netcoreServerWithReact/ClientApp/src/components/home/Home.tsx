import React, { Component } from 'react';
import { Leftbar } from '../elements/leftbar/Leftbar';
import { Right } from './subComponents/right/Right';

export class Home extends Component {
    static displayName = Home.name;

    public render():JSX.Element {
        return (
            <div id="parentDiv">
                <Leftbar />
                <Right />
            </div>
        );
    }
}
