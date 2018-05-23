import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, withRouter } from 'react-router-dom';
import {Tracker} from 'meteor/tracker';
import createHistory from 'history/createBrowserHistory'
import {Session} from 'meteor/session';

import Home from '../imports/ui/Home';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

const history = createHistory();
const unauthenicatedPages = [ '/signup'];
const authenticatedPage = ['/'];

//switch moves through route definitions in order till it finds a match so anything that
//doesnt match it defaults to the bottom router
//browserrouter requires 1 child element

const routes = (
  <Router history={history}>
        <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/signup" component={Login}  />
            <Route path="*" component={NotFound} />
        </Switch>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  console.log("Authenticaion status: ", isAuthenticated);

  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenicatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPage.includes(pathname);

  //if logged in and try to go to signup or register page, redirect them to logout page
  if (isAuthenticated && isUnauthenticatedPage) {
    console.log("redirecting to /home");
    history.push('/');
  }
    //if not logged in but try to go to a page that needs authentication, send them to login page
  else if (!isAuthenticated && isAuthenticatedPage) {
    console.log("redirecting to /");
    history.push('/signup');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
