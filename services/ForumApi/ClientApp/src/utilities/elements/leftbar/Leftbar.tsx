import React, { Component } from 'react';
import './leftBar.css';
import { Link } from 'react-router-dom';

export class Leftbar extends Component {
  static displayName = Leftbar.name;

  render () {
    return (
        <div id="left">
            <div className="leftLinkParent">
                <Link to="/" className="leftBarlink">
                    <span>মুল পাতা</span>
                </Link>
                <Link to = "/" className="leftBarlink">
                    <span className="fa fa-hand-o-up" style={{paddingRight: '5px'}}></span>
                    <span>সমীকরণ</span>
                </Link>
                <Link to = "/tags" className="leftBarlink">
                    <span style={{paddingLeft: '20px'}}>বিষয় সমুহ</span>
                </Link>
                <Link to ="/users" className="leftBarlink">
                    <span style={{paddingLeft:'20px'}}>ব্যবহারকারী</span>
                </Link>

            </div>
        </div>
    );
  }
}
