import React, { Component } from 'react';
import './leftBar.css';

export class Leftbar extends Component {
  static displayName = Leftbar.name;

  render () {
    return (
        <div id="left">
            <div>
                <a href="home.html">
                    <span>মুল পাতা</span>
                </a>
                <a href="home.html">
                    <span className="fa fa-hand-o-up" style={{paddingRight: '5px'}}></span>
                    <span>সমীকরণ</span>
                </a>
                <a href="tags.html">
                    <span style={{paddingLeft: '20px'}}>বিষয় সমুহ</span>
                </a>
                <a href="users.html">
                    <span style={{paddingLeft:'20px'}}>ব্যবহারকারী</span>
                </a>

            </div>
        </div>
    );
  }
}
