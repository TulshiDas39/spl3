import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { Auth0Context } from "../../Contexts"
import { IAuth0Contex } from "../../Structures";
import { async } from "q";

interface state {
    searchSM: {}
}

export class Nav extends React.Component<{}, state> {

    static displayName = Nav.name;
    private searchSmPoped = false;
    static contextType = Auth0Context;

    constructor(props: any) {
        super(props);
        this.state = { searchSM: {} };
        this.toogle = this.toogle.bind(this);
    }

    toogle() {
        console.log('in toogle');
        console.log();
        if (this.searchSmPoped) {
            this.setState({
                searchSM: {}
            })
            this.searchSmPoped = !this.searchSmPoped;
        }
        else {
            this.setState({
                searchSM: {
                    display: 'flex'
                }
            })
            this.searchSmPoped = !this.searchSmPoped;
        }
    }

    render() {
        let context = this.context as IAuth0Contex;
        return (
            <div id="nav">
                <div id="list-sm">
                    <span className="fa fa-list-ul"></span>
                </div>
                <div id="logo">

                    <Link to="/">
                        <span className="fa fa-hand-o-up" style={{ color: 'teal' }}></span>
                        <span>সমীকরণ</span>
                    </Link>
                </div>
                <div id="project">
                    <span>
                        প্রকাশনা
                    </span>
                </div>
                <div id="search" className="search" style={this.state.searchSM} >
                    <form action="/search" >
                        <span className="fa fa-search"></span>
                        <input id="searchBox" type="text" placeholder="খুজুন..." />
                    </form>
                </div>
                <div id="search-sm" onClick={this.toogle}>
                    <span id="search-sm-icon" className="fa fa-search"></span>
                </div>
                {context.isAuthenticated ? this.getUser() : this.getLogin()}
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

    private getLogin() {
        let context = this.context as IAuth0Contex;
        return (
            <button id="idNavLogin" onClick = { async ()=> await context.loginWithRedirect({
                appState: { targetUrl: window.location.pathname }
              })}>লগইন</button>
        );
    }

    private getUser() {
        return (
            <a href="#" id="user">
                <img src="res/images/meanduddipda.jpg" alt="" />
                <span id="reputation"> ৪৪ </span>
                <span className="fa fa-eercast"></span>
                <span id="badge">৪</span>
            </a>
        )
    }
}