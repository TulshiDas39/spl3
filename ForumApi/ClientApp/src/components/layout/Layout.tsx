import React, { Component } from 'react';
import  Nav  from '../nav/Nav';
import {Auth0Context} from '../../utils/Contexts';

export class Layout extends Component {
  static displayName = Layout.name;

  static contextType = Auth0Context;

  render () {
    return (
      <div>
        <Nav myContext={this.context}/>
        <div id="secondRoot">
          {this.props.children}
        </div>
      </div>
    );
  }
}
