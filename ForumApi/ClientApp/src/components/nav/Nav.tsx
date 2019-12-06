import React, { Component } from "react";
import "./nav.scss";
import { Link, withRouter} from "react-router-dom";
import { IAuth0Context } from "../../utils/Structures";
import { INavProps } from "./Types";
import { utilityService } from "../../services/UtilityService";

interface state {
    searchSM: {}
}

class Nav extends Component<INavProps, state> {

    static displayName = Nav.name;
    private searchSmPoped = false;
    private contextValues: IAuth0Context;
    private searchValue = "";

    constructor(props: INavProps) {
        super(props);
        this.state = { searchSM: {} };
        this.toogle = this.toogle.bind(this);
        console.log('mycontext:');
        console.log(props.myContext);
        this.contextValues = props.myContext;

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

    private search(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            console.log('enter pressed');
            console.log(event.target);
            if (this.searchValue) {
                this.props.history.push('/search/' + this.searchValue);
            }
        }
        else console.log('other key pressed');

    }

    private onSearchValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.searchValue = event.target.value;
    }

    private getReputations(){
        let reputation = this.contextValues.userInfo.reputation;
        if(reputation<1000) return utilityService.convertToBengaliText(reputation);
        reputation = Math.floor(reputation/1000);
        if(reputation <100) return utilityService.convertToBengaliText(reputation)+" হা.";
        reputation = Math.floor(reputation/100);
        return utilityService.convertToBengaliText(reputation)+" ল.";
    }

    render() {
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
                <div id="search" className="search" style={this.state.searchSM} >
                    <div className="searchBoxContainer">
                        <span className="fa fa-search"></span>
                        <input id="searchBox" type="text" placeholder="খুজুন..." onChange={this.onSearchValueChange.bind(this)} onKeyPress={this.search.bind(this)} />
                    </div>
                </div>
                <div id="search-sm" onClick={this.toogle}>
                    <span id="search-sm-icon" className="fa fa-search"></span>
                </div>
                {this.contextValues.isAuthenticated ? this.getUser() : this.getLogin()}
                <div id="nofic">
                    <span className="fa fa-globe"></span>
                </div>

                <div id="help">
                    <Link to="/help" className="fa fa-question-circle"></Link>
                </div>
            </div>
        );
    }

    private getLogin() {
        return (
            <button id="idNavLogin" onClick={async () => await this.contextValues.loginWithRedirect({
                appState: { targetUrl: window.location.pathname }
            })}>লগইন</button>
        );
    }

    private getUser() {
        return (
            [<Link to={"/profile/"+this.contextValues.userInfo.id} key="userIcon123" href="#" id="user">
                <img src= {this.contextValues.user.picture} alt="" />
                <span style={{fontSize:'0.6em'}} className="fa fa-certificate"></span>
                <span id="reputation"> {this.getReputations()} </span>
            </Link>, <button key="logoutBtn123" id="logoutBtn" onClick={() => this.contextValues.logout({ returnTo: window.location.origin })}>লগআউট</button>]
        )
    }
}

export default withRouter(Nav);