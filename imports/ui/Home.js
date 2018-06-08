import React from 'react';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

export class Home extends React.Component {

      constructor(props) {
        super(props);
      }

      componentWillMount() {
          //set the global session variable currentPagePrivacy to the value that was passed in as props from the route component in main.js
          Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
      }
      renderAllUsers(){
            return this.props.allUsers.map((user)=>{
                let redirectToChat = `/home/${user._id}`;
                return(

                  <div>
                    <Link to ={redirectToChat} className='goToChat__button item-chat-header' key = {user._id}>
                        <div className="row item-chat"> {user.username}  </div>
                    </Link>
                  </div>

                )
            })
      }

      render() {
          return (
                  <div>
                      <div className = "container-fluid header">
                            <div className = "jumborton">
                                <p className = "header-loggedInAs text-right">Logged in as:{this.props.username} </p>
                                  <PrivateHeader   />

                            </div>
                        </div>
                        <div className="container-fluid ">
                            <div className="row justify-content-center item-availableUsersHeading">
                                  <h3>Users available to chat</h3>
                            </div>
                              {this.renderAllUsers()}
                        </div>
                  </div>
          );
      }

}


export default createContainer(() => {
  Meteor.subscribe("userList")
    return {
      username:Meteor.user() != undefined ? Meteor.user().username : 'undefined',
      allUsers:Meteor.users.find({}).fetch()
    };
}, Home);
