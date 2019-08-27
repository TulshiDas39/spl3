import React from "react";
import "./nav.css";
import { NavManager } from "./NavManager";

export class Nav extends React.Component {

    static displayName = Nav.name;
    private manager = new NavManager();

    render() {
        return (
            <div id="nav">
                <div id="list-sm">
                    <span className="fa fa-list-ul"></span>
                </div>
                <div id="logo">

                    <a href="#">
                        <span className="fa fa-hand-o-up" style={{ color: 'teal' }}></span>
                        <span>সমীকরণ</span>
                    </a>
                </div>
                <div id="project">
                    <span>
                        প্রকাশনা
                </span>
                </div>
                <div id="search" className="search">
                    <form action="/search" >
                        <span className="fa fa-search"></span>
                        <input id="searchBox" type="text" placeholder="খুজুন..." />
                    </form>
                </div>
                <div id="search-sm">
                    <span id="search-sm-icon" className="fa fa-search"></span>
                </div>
                <a href="#" id="user">
                    <img src="res/images/meanduddipda.jpg" alt="" />
                    <span id="reputation">
                        ৪৪
                </span>
                    <span className="fa fa-eercast"></span>
                    <span id="badge">
                        ৪
                    </span>
                </a>

                <div id="nofic">
                    <span className="fa fa-globe"></span>
                </div>
                <div id="achieve">
                    <span className="fa fa-gift"></span>
                </div>

                <div id="help">
                    <span className="fa fa-question-circle"></span>
                </div>
            </div>
        );
    }
}