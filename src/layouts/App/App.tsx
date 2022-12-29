import React from 'react';
import loadable from '@loadable/component';
import {Switch, Route, Redirect } from 'react-router-dom';

const Login = loadable(() => import ('src/pages/Login') );
const LoginCheck = loadable(() => import ('src/pages/LoginCheck') );
const Workspaces = loadable(() => import ('src/layouts/Workspace/index') );
const Error = loadable(() => import ('src/pages/Error') );


const App = () => {
  return (
  <Switch>
    <Redirect exact path = "/" to ="/Login"/>
    <Route path = "/Login" component={Login}/>
    <Route path = "/logincheck" component={LoginCheck}/>
    <Route path = "/workspace/:workspace" component={Workspaces}/>
    <Route path = "/error" component={Error}/>
    <Route path = "/*" component={Error}/>
  </Switch>
  );
};

export default App;
