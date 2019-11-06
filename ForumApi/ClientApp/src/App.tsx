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
import Loading from './components/loader/Loading';
import {Auth0Context} from './utils/Contexts';
import { IAuth0Context } from './utils/Structures';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PrivateRoute from './components/auth/PrivateRoute';

interface props {
  basename: string;
}

export default class App extends Component<props, any> {
  static displayName = App.name;
  static contextType = Auth0Context;
  constructor(props: props) {
    super(props);
  }

  componentDidUpdate(){
    console.log('component did update');
    this.log();
  }

  async log(){
    let context = this.context as IAuth0Context;
  
    if(context && context.isAuthenticated){
      console.log('authenticated');
      let accessToken = await context.getTokenSilently();
      console.log('accessToken:');
      console.log(accessToken);
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
            <ProtectedRoute path='/answer/:handle' component={Answer} />
            <Route path='/user' component={UserActivity} />
            <PrivateRoute path='/ask' component={Ask} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
