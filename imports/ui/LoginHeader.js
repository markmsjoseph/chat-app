import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class LoginHeader extends React.Component {

  onLogout() {
    console.log("logout clicked");
    Accounts.logout();
  }

  render() {
    return (
      <div className="title-bar">
        <div className="wrapper">
            <h1> {this.props.title}</h1>
            <h3> {this.props.shortDes} </h3>
        </div>


      </div>
    );
  }


  }
