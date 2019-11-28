import React, { Component } from 'react';
import { Leftbar } from '../leftbar/Leftbar';
import { Right } from './subComponents/right/Right';
import { IHomeProps } from './Types';

export class Home extends Component<IHomeProps, any> {
    static displayName = Home.name;
    private search?: string;

    public render(): JSX.Element {
        console.log('search value:'+this.search);
        return (
            <div id="parentDiv">
                <Leftbar />
                <Right />
            </div>
        );
    }
}
