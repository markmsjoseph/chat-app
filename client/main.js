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
import MessagingRoom from '../imports/ui/MessagingRoom';

const history = createHistory();


//switch moves through route definitions in order till it finds a match so anything that
//doesnt match it defaults to the bottom router
//browserrouter requires 1 child element

const routes = (
  <Router history={history}>
        <Switch>
            <Route path="/home" exact={true} render={ (props) => <Home priavteOrPublic= {"privateRoute"} {...props} />} />
            <Route path="/home/:id" exact={true} render={ (props) => <MessagingRoom priavteOrPublic= {"privateRoute"} {...props} />} />
            <Route path="/" render={ (props) => <Login priavteOrPublic= {"publicRoute"} {...props} />} />
            <Route path="*" component={NotFound} />
        </Switch>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  //get the value from the session variable for each page and listen for changes to it from within trackerautorun
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  console.log("Current page privacy: ", currentPagePrivacy);

  //if logged in and try to go to a page that is public, redirect user to the homepage or dashboard page that only logged in users can see
  if (isAuthenticated && currentPagePrivacy==="publicRoute") {
    console.log("redirecting to /home");
    history.push('/home');
  }
    //if not logged in but try to go to a page that needs authentication, send user to login page
  else if (!isAuthenticated && currentPagePrivacy==="privateRoute") {
    console.log("redirecting to /");
    history.push('/');
  }
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
