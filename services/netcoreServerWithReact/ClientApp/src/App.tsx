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

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/tags' component={Tags} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/answer' component={Answer} />
        <Route exact path='/user' component={UserActivity} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
