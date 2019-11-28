import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Home } from './components/home/Home';
import { Tags } from './components/tags/Tags';
import { Users } from './components/users/Users';
import { Answer } from './components/answer/Answer';
import { UserActivity } from './components/userActivity/UserActivity';
import { Ask } from './components/ask/Ask';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/loader/Loading';
import { Auth0Context } from './utils/Contexts';
import { IAuth0Context } from './utils/Structures';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import { SearchResult } from './components/searchResult/SearchResult';
import { UserProfile } from './components/userProfile/UserProfile';

interface props {
  basename: string;
}

export default class App extends Component<props, any> {
  static displayName = App.name;
  static contextType = Auth0Context;

  componentDidUpdate() {
    console.log('component did update');
    this.log();
  }

  async log() {
    let context = this.context as IAuth0Context;

    if (context && context.isAuthenticated) {
      console.log('authenticated');
      let accessToken = context.token;
      console.log('accessToken:');
      console.log(accessToken);
      console.log('userInfo');
      console.log(context.userInfo);
    }
    else console.log('not authenticated');
  }

  render() {
    const { loading } = this.context as IAuth0Context;

    if (loading) {
      return <Loading />;
    }

    return (
      <BrowserRouter basename={this.props.basename}>
        <Layout>
          <Switch>
            <ProtectedRoute exact path='/' component={Home} />
            <Route path='/tags' component={Tags} />
            <Route path='/users' component={Users} />
            <Route path='/search/:search' component={SearchResult} />
            <ProtectedRoute path='/answer/:handle' component={Answer} />
            <Route path='/user' component={UserActivity} />
            <PrivateRoute path='/ask' component={Ask} />
            <Route path='/profile/:userId' component={UserProfile} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
