import React, { Component } from "react";
import "./pagination.css";

interface props{
    eventNext():void;
    eventPrev():void;
}

export class Pagination extends Component<props, any>{

    public render() {
        return (
            <div className="pagination">
                <span className="pagination-btn" onClick={this.props.eventPrev}>prev</span>
                <span className="pagination-btn" onClick={this.props.eventNext}>next</span>
            </div>

        )
    }
}