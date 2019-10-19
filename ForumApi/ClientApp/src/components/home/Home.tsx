import React, { Component } from 'react';
import { Leftbar } from '../leftbar/Leftbar';
import { Right } from './subComponents/right/Right';

export class Home extends Component {
    static displayName = Home.name;

    public render():JSX.Element {
        return (
            <div id="parentDiv">
                <Leftbar />
                <Right userId="5d8358193e2c7c281009e8c8"/>
            </div>
        );
    }
}
