import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './components/home/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/counter/Counter';
import { Tags } from './components/tags/Tags';
import { Users } from './components/users/Users';
import { Answer } from './components/answer/Answer';
import { UserActivity } from './components/userActivity/UserActivity';
import { Ask } from './components/ask/Ask';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/tags' component={Tags} />
        <Route path='/users' component={Users} />
        <Route path='/answer' component={Answer} />
        <Route path='/user' component={UserActivity} />
        <Route path='/ask' component={Ask} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
