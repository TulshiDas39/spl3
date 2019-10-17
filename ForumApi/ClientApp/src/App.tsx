import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './components/home/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/counter/Counter';
import { Tags } from './components/tags/Tags';
import { Users } from './components/users/Users';
import { Answer } from './components/answer/Answer';
import { UserActivity } from './components/userActivity/UserActivity';
import { Ask } from './components/ask/Ask';
import { BrowserRouter } from 'react-router-dom';
import Loading from './utilities/elements/loader/Loading';
import {Auth0Context} from './utilities/Contexts';

interface props {
  basename: string;
}

export default class App extends Component<props, any> {
  static displayName = App.name;
  static contextType = Auth0Context;
  constructor(props: props) {
    super(props);
  }

  render() {
    const { loading } = this.context as any;

    if (loading) {
      return <Loading />;
    }

    return (
      <BrowserRouter basename={this.props.basename}>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/tags' component={Tags} />
            <Route path='/users' component={Users} />
            <Route path='/answer/:handle' component={Answer} />
            <Route path='/user' component={UserActivity} />
            <Route path='/ask' component={Ask} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
