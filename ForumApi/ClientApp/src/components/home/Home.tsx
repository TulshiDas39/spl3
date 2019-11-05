import React, { Component } from 'react';
import { Leftbar } from '../leftbar/Leftbar';
import { Right } from './subComponents/right/Right';
import { Log } from './Service';

export class Home extends Component {
    static displayName = Home.name;

    public render():JSX.Element {
        Log("service testing");
        return (
            <div id="parentDiv">
                <Leftbar />
                <Right/>
            </div>
        );
    }
}
