import React, { Component } from 'react';
import { Leftbar } from '../leftbar/Leftbar';
import { Right } from './subComponents/right/Right';
import { IHomeProps } from './Types';
import styles from "./home.module.scss";

export class Home extends Component<IHomeProps, any> {
    static displayName = Home.name;
    private search?: string;

    public render(): JSX.Element {
        console.log('search value:'+this.search);
        return (
            <div id={styles.parentDiv}>
                <Leftbar />
                <Right />
            </div>
        );
    }
}
