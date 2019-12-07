import React, { Component } from 'react';
import { Leftbar } from '../leftbar/Leftbar';
import { Right } from './subComponents/right/Right';
import { IHomeProps } from './Types';
import { sideBarSubject } from '../../utils/Contexts';
import { SideBar } from '../../utils/Enums';

export class Home extends Component<IHomeProps, any> {
    static displayName = Home.name;
    private search?: string;

    componentDidMount() {
        sideBarSubject.next(SideBar.MAIN_PAGE);
    }

    public render(): JSX.Element {
        console.log('search value:' + this.search);
        return (
            <Right />
        );
    }
}
