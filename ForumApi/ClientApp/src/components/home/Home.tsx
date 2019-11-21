import React, { Component } from 'react';
import { Leftbar } from '../leftbar/Leftbar';
import { Right } from './subComponents/right/Right';
import { IHomeProps } from './Types';

export class Home extends Component<IHomeProps, any> {
    static displayName = Home.name;
    private search?: string;

    constructor(props: IHomeProps) {
        super(props);
        this.search = props.match.params.search;
        console.log('serach value');
        if (this.search) {
            console.log('search exist');
            console.log(this.search);
        }
        else console.log('search not exist');

    }

    // componentWillUpdate() {
    //     console.log('component will update:');
    //     this.search = this.props.match.params.search;
    //     console.log('component will update:'+this.search);
    //     if (this.search) {
    //         console.log('search exist');
    //         console.log(this.search);
    //     }
    //     else console.log('search not exist');
    // }

    public render(): JSX.Element {
        this.search = this.props.match.params.search;
        console.log('search value:'+this.search);
        return (
            <div id="parentDiv">
                <Leftbar />
                <Right search={this.search} />
            </div>
        );
    }
}
