import React from 'react';
import loadable from '@loadable/component';
import {Switch, Route, Redirect } from 'react-router-dom';
import Profile from '@pages/Profile';

const Login = loadable(() => import ('src/pages/Login') );
//const SignUp = loadable(() => import ('src/pages/SignUp') );
const Workspaces = loadable(() => import ('src/layouts/Workspace/index') );


const App = () => {
  return (
  <Switch>
    <Redirect exact path = "/" to ="/Login"/>
    <Route path = "/login" component={Login}/>
    {/*<Route path = "/signup" component={SignUp}/>*/}
    {/* <Route path = "/workspace/channel" component={Channel}/>
    <Route path = "/workspace/dm" component={DirectMessage}/> */}
    <Route path = "/workspace/:workspace" component={Workspaces}/>
    {/* // /workspace/test */}
  </Switch>
  );
};

export default App;
