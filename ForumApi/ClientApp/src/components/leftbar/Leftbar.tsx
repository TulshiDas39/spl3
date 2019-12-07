import React, { Component } from 'react';
import styles from './leftBar.module.scss';
import { Link } from 'react-router-dom';
import { sideBarSubject } from '../../utils/Contexts';
import { SideBar } from '../../utils/Enums';


export class Leftbar extends Component<any, any> {
    static displayName = Leftbar.name;
    private currentTab = SideBar.NONE;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        sideBarSubject.subscribe(value => {
            this.currentTab = value;
            this.setState(this.state);
        })
    }

    componentWillUnmount(){
        sideBarSubject.unsubscribe();
    }

    render() {
        if(this.currentTab === SideBar.NONE) return null;
        return (
            <div id={styles.left}>
                <div className={styles.leftLinkParent}>
                    <Link to="/" className={styles.leftBarlink} style={this.getBorderRight(SideBar.MAIN_PAGE)}>
                        <span>মুল পাতা</span>
                    </Link>
                    <Link to="/" className={styles.leftBarlink} style={this.getBorderRight(SideBar.EQUATION)}>
                        <span className="fa fa-hand-o-up" style={{ paddingRight: '5px' }}></span>
                        <span>সমীকরণ</span>
                    </Link>
                    <Link to="/tags" className={styles.leftBarlink} style={this.getBorderRight(SideBar.TAGS)}>
                        <span style={{ paddingLeft: '20px' }}>বিষয় সমুহ</span>
                    </Link>
                    <Link to="/users" className={styles.leftBarlink} style={this.getBorderRight(SideBar.USERS)}>
                        <span style={{ paddingLeft: '20px' }}>ব্যবহারকারী</span>
                    </Link>

                </div>
            </div>
        );
    }

    private getBorderRight(tab: SideBar): React.CSSProperties | undefined {
        if (this.currentTab == tab) return {
            borderRight: '4px solid #F48024',
            background: 'rgba(12,13,14,0.05)',
            fontWeight: 'bold',
            padding: '8px 6px 8px 8px'
        }
    }
}
