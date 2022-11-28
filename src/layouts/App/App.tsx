import React from 'react';
import loadable from '@loadable/component';
import {Switch, Route, Redirect } from 'react-router-dom';
// import orkspaces } from '@layouts/Workspace';
// import DirectMessage from '@pages/DirectMessage';

const Login = loadable(() => import ('../../pages/Login') );
const SignUp = loadable(() => import ('../../pages/SignUp') );
// const Channel = loadable(() => import ('@pages/Channel') );
// const DirectMessage = loadable(() => import ('@pages/DirectMessage') );
const Workspaces = loadable(() => import ('../Workspace') );


const App = () => {
  return (
  <Switch>
    <Redirect exact path = "/" to ="/Login"/>
    <Route path = "/login" component={Login}/>
    <Route path = "/signup" component={SignUp}/>
    {/* <Route path = "/workspace/channel" component={Channel}/>
    <Route path = "/workspace/dm" component={DirectMessage}/> */}
    <Route path = "/workspace/:workspace" component={Workspaces}/>
    {/* // /workspace/test */}
  </Switch>
  );
};

export default App;
