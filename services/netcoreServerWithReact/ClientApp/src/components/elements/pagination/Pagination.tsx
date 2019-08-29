import React, { Component } from "react";
import "./pagination.css";

export class Pagination extends Component<any, any>{

    public render() {
        return (
            <div className="pagination">
                <span className="pagination-btn">prev</span>
                <span className="pagination-btn">1</span>
                <span className="pagination-btn">...</span>
                <span className="pagination-btn">2</span>
                <span className="pagination-btn">3</span>
                <span className="pagination-btn">4</span>
                <span className="pagination-btn">5</span>
                <span className="pagination-btn">...</span>
                <span className="pagination-btn">6</span>
                <span className="pagination-btn">next</span>
            </div>

        )
    }
}