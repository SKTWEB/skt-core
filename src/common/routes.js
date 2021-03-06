import React from 'react';
import { Route , IndexRoute} from "react-router";
import App from "./containers/App";

import HomePage from "./components/Home";
import TopicPage from "./containers/TopicPage";
import PublishPage from './containers/PublishPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

export default (
  <Route name="app" component={App} path="/">
        <Route path="home" component={HomePage} />
        <Route path="topics" component={TopicPage} />
        <Route path="topics/:category" component={TopicPage} />
        <Route path="Publish" component={PublishPage} />
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegisterPage} />
  </Route>
);
