import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {

  onLogout() {
    console.log("logout clicked");
    Accounts.logout();
  }

  render() {
    return (
      <div >
        <button className = "header-logoutButton float-right mt-2" onClick={this.onLogout.bind(this)}>Logout</button>
        <h1 className = "header-title text-center"> {this.props.title}</h1>
        <h3 className = "subtitle-bar text-center"> {this.props.subtitle}</h3>

      </div>
    );
  }


  }
