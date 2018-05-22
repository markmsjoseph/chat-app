import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, withRouter } from 'react-router-dom';
import {Tracker} from 'meteor/tracker';
import createHistory from 'history/createBrowserHistory'
import {Post} from '../imports/api/post';
import {Session} from 'meteor/session';

import Signup from '../imports/ui/Signup';
import Home from '../imports/ui/Home';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';
import AddPost from '../imports/ui/AddPost';
import ManagePost from '../imports/ui/ManagePost';
import SavedPost from '../imports/ui/SavedPost';
import AdminPage from '../imports/ui/AdminPage';
import MessagingRoom from '../imports/ui/MessagingRoom';
import AllChats from '../imports/ui/AllChats';
import EditExpenseForm from '../imports/ui/EditExpenseForm';
import PublicPage from '../imports/ui/publicPage';
const history = createHistory();
const unauthenicatedPages = ['/', '/signup'];
const authenticatedPage = ['/home', '/addPost','/managePost', '/savedPost', "/adminPage", "/allChats","/chat","/EditExpenseForm"];

//switch moves through route definitions in order till it finds a match so anything that
//doesnt match it defaults to the bottom router
//browserrouter requires 1 child element

const routes = (
  <Router history={history}>
        <Switch>
            <Route path="/" component={PublicPage} exact={true} />
            <Route path="/signup" component={Login}  />
            <Route path="/home" component={Home} />
            <Route path="/addPost" component={AddPost} />
            <Route path="/managePost" component={ManagePost} />
            <Route path="/savedPost" component={SavedPost} />
            <Route path="/adminPage" component={AdminPage} />
              <Route path="/allChats" component={AllChats} />
            <Route path="/chat" component={MessagingRoom} />
            <Route path="/EditExpenseForm" component={EditExpenseForm} />
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
    history.push('/home');
  }
    //if not logged in but try to go to a page that needs authentication, send them to login page
  else if (!isAuthenticated && isAuthenticatedPage) {
    console.log("redirecting to /");
    history.push('/');
  }
});

Meteor.startup(() => {
  //we are setting default value for session
  Session.set('whatToDisplay', "users");
  Session.set('messageSession', "default");
  ReactDOM.render(routes, document.getElementById('app'));
});
