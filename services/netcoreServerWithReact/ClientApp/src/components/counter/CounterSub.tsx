import React, { Component } from 'react';

export class CounterSub extends Component {
    static displayName = CounterSub.name;

    constructor(props: any) {
        super(props);
//        this.state = { currentCount: 0 };
       // this.incrementCounter = this.incrementCounter.bind(this);
    }

    // incrementCounter() {
    //     this.setState({
    //         currentCount: this.state.currentCount + 1
    //     });
    // }

    render() {
        return (
            <p style={{color: 'pink',backgroundColor:'red'}}>this is my custom sub component.</p>
        );
    }
}