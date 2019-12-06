import React, { Component } from 'react';
import { Auth0Context } from '../../utils/Contexts';

export class UtilityLayout extends Component {
  static displayName = UtilityLayout.name;

  static contextType = Auth0Context;

  render() {
    return (
      <div id="parentDiv">
        {this.props.children}
      </div>
    );
  }
}
