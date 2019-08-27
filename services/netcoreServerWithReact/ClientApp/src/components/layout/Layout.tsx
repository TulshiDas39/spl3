import React, { Component } from 'react';
import { Nav } from '../elements/nav/Nav';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Nav/>
        <div id="parentDiv">
          {this.props.children}
        </div>
      </div>
    );
  }
}
