import React, { Component } from 'react';
import { Nav } from '../nav/Nav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Nav/>
        <div id="secondRoot">
          {this.props.children}
        </div>
      </div>
    );
  }
}
