import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
export default class PrivateHeader extends React.Component {

  onLogout() {
    console.log("logout clicked");
    Accounts.logout();
  }

  render() {
    return (
      <div >
        <h1 className = "title-bar"> {this.props.title}</h1>
        <h3 className = "subtitle-bar"> {this.props.subtitle}</h3>
        <Link to ="/signup" className = "logoutButton">Login or Signup</Link>
      </div>
    );
  }


  }
