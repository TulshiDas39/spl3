import React, { Component } from 'react';
import styles from './leftBar.module.scss';
import { Link } from 'react-router-dom';

export class Leftbar extends Component {
  static displayName = Leftbar.name;

  render () {
    return (
        <div id={styles.left}>
            <div className={styles.leftLinkParent}>
                <Link to="/" className={styles.leftBarlink}>
                    <span>মুল পাতা</span>
                </Link>
                <Link to = "/" className={styles.leftBarlink}>
                    <span className="fa fa-hand-o-up" style={{paddingRight: '5px'}}></span>
                    <span>সমীকরণ</span>
                </Link>
                <Link to = "/tags" className={styles.leftBarlink}>
                    <span style={{paddingLeft: '20px'}}>বিষয় সমুহ</span>
                </Link>
                <Link to ="/users" className={styles.leftBarlink}>
                    <span style={{paddingLeft:'20px'}}>ব্যবহারকারী</span>
                </Link>

            </div>
        </div>
    );
  }
}
