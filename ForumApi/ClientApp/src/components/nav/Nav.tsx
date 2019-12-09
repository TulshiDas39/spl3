import React, { Component } from "react";
import styles from "./nav.module.scss";
import { Link, withRouter } from "react-router-dom";
import { IAuth0Context } from "../../utils/Structures";
import { INavProps } from "./Types";
import { utilityService } from "../../services/UtilityService";
import { sideBarSubject } from "../../utils/Contexts";
import { SideBarMode, SidebarDisplay } from "../../utils/Enums";
import { navService } from "./NavService";
import { sideBarService } from "../leftbar/LeftBarService";

interface state {
    searchSM: {}
}

class Nav extends Component<INavProps, state> {

    static displayName = Nav.name;
    private searchSmPoped = false;
    private contextValues: IAuth0Context;
    private searchValue = "";
    private sideBarMode = SideBarMode.NORMAL;
    private isSmallDevice:boolean = undefined as any;

    constructor(props: INavProps) {
        super(props);
        this.state = { searchSM: {} };
        this.toogle = this.toogle.bind(this);
        console.log('mycontext:');
        console.log(props.myContext);
        this.contextValues = props.myContext;
        this.init()
    }

    init() {
        this.applyEffectOfWindowSize();
        window.addEventListener('resize', this.applyEffectOfWindowSize);
    }

    private applyEffectOfWindowSize() {
        if (window.matchMedia('(max-width: 640px)').matches) {
            if (this.isSmallDevice !== true) {
                this.isSmallDevice = true;
                sideBarService.sideBarDisplay.next(SidebarDisplay.NONE);
                navService.sideBarModeSubject.next(SideBarMode.POPUP);
            }
        }
        if (window.matchMedia('(min-width: 640px)').matches) {
            if (this.isSmallDevice !== false) {
                this.isSmallDevice = false;
                navService.sideBarModeSubject.next(SideBarMode.NORMAL);
                sideBarService.sideBarDisplay.next(SidebarDisplay.NORMAL);
            }
        }
    }

    componentDidMount() {
        sideBarSubject.subscribe(value => {
            this.setState(this.state);
        })

        navService.sideBarModeSubject.subscribe((value) => {
            this.sideBarMode = value;
            if (this.sideBarMode === SideBarMode.NORMAL) sideBarService.sideBarDisplay.next(SidebarDisplay.NORMAL);
            this.setState(this.state);
        })
    }

    toogle() {
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

    private getReputations() {
        let reputation = this.contextValues.userInfo.reputation;
        if (reputation < 1000) return utilityService.convertToBengaliText(reputation);
        reputation = Math.floor(reputation / 1000);
        if (reputation < 100) return utilityService.convertToBengaliText(reputation) + " হা.";
        reputation = Math.floor(reputation / 100);
        return utilityService.convertToBengaliText(reputation) + " ল.";
    }

    private toogleSideBar() {
        if (sideBarService.sideBarDisplay.value === SidebarDisplay.NONE)
            sideBarService.sideBarDisplay.next(SidebarDisplay.POPUP);
        else sideBarService.sideBarDisplay.next(SidebarDisplay.NONE)
    }

    render() {
        return (
            <div id={styles.nav}>
                <div id={styles.list_sm} onClick={this.toogleSideBar.bind(this)} style={this.getListIconStyle()}>
                    <span className="fa fa-list-ul"></span>
                </div>
                {this.getLogo()}

                <div id={styles.search} className={styles.search} style={this.state.searchSM} >
                    <div className={styles.searchBoxContainer}>
                        <span className="fa fa-search"></span>
                        <input id={styles.searchBox} type="text" placeholder="খুজুন..." onChange={this.onSearchValueChange.bind(this)} onKeyPress={this.search.bind(this)} />
                    </div>
                </div>
                <div id={styles.search_sm} onClick={this.toogle}>
                    <span id={styles.search_sm_icon} className="fa fa-search"></span>
                </div>
                {this.contextValues.isAuthenticated ? this.getUser() : this.getLogin()}
                {/* <div id={styles.nofic}>
                    <span className="fa fa-globe"></span>
                </div> */}

                <div id={styles.help}>
                    <Link to="/help" className="fa fa-question-circle"></Link>
                </div>
            </div>
        );
    }

    getListIconStyle(): React.CSSProperties | undefined {
        if (this.sideBarMode === SideBarMode.POPUP) return {
            display: 'flex'
        }
        else return {
            display: ''
        }
    }

    private getLogo() {
        if (this.sideBarMode === SideBarMode.NORMAL) return (
            <div id={styles.logo}>

                <Link to="/">
                    <span className="fa fa-hand-o-up" style={{ color: 'teal' }}></span>
                    <span>সমীকরণ</span>
                </Link>
            </div>

        )
    }

    private getLogin() {
        return (
            <button id={styles.idNavLogin} onClick={async () => await this.contextValues.loginWithRedirect({
                appState: { targetUrl: window.location.pathname }
            })}>লগইন</button>
        );
    }

    private getUser() {
        return (
            [<Link to={"/profile/" + this.contextValues.userInfo.id} key="userIcon123" href="#" id={styles.user}>
                <img src={this.contextValues.user.picture} alt="" />
                <span style={{ fontSize: '0.6em' }} className="fa fa-certificate"></span>
                <span id={styles.reputation}> {this.getReputations()} </span>
            </Link>, <button key="logoutBtn123" id={styles.logoutBtn} onClick={() => this.contextValues.logout({ returnTo: window.location.origin })}>লগআউট</button>]
        )
    }
}

export default withRouter(Nav);