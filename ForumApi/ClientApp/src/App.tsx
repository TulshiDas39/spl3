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
import { BrowserRouter } from 'react-router-dom';

interface props{
  basename:string;
}

export default class App extends Component<props,any> {
  static displayName = App.name;
  constructor(props:props){
    super(props);
  }

  render() {
    return (
      <BrowserRouter basename={this.props.basename}>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/tags' component={Tags} />
          <Route path='/users' component={Users} />
          <Route path='/answer/:handle' component={Answer} />
          <Route path='/user' component={UserActivity} />
          <Route path='/ask' component={Ask} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
        </Layout>
      </BrowserRouter>
    );
  }
}
