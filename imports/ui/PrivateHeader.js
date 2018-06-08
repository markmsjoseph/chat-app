import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {Session} from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export class PrivateHeader extends React.Component {

    onLogout() {
      console.log("logout clicked");
      Accounts.logout();
    }

    onImageClick(){
      if(this.props.isNavOpen){
          Session.set('isNavOpen', false);
          console.log("NAV NOW CLOSED");
      }
      else{
          Session.set('isNavOpen', true);
          console.log("NAV NOW OPEN");
      }

    }

    render() {

      const imageSource = this.props.isNavOpen ? 'images/x.svg' : '/images/bars.svg';

      return (
        <div >
          <img className = "header_nav_toggle" src =  {imageSource} onClick = {this.onImageClick.bind(this)}/>
          <button className = "header-logoutButton float-right mt-2" onClick={this.onLogout.bind(this)}>Logout</button>
          <h1 className = "header-title text-center"> {this.props.title}</h1>
          <h3 className = "subtitle-bar text-center"> {this.props.subtitle}</h3>
          <div className="page-content__sidebar-menu">

          </div>

        </div>
      );
    }



}


export default createContainer(() => {
    return {
        //used to update the value of the session, so when we click and change it to true, we want to get the updated value
        isNavOpen:Session.get('isNavOpen')
    };
}, PrivateHeader);



PrivateHeader.defaultProps = {
    title: 'Chat App'
};
