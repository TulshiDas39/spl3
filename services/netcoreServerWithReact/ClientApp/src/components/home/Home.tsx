import React, { Component } from 'react';

import './home.css';
import { Leftbar } from '../elements/leftbar/Leftbar';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div id="parentDiv">
                <Leftbar />
            </div>
            
        );
    }
}
