import React from 'react';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import ChatComponent from './ChatComponent';
import {Chat} from '../api/chat';
import PrivateHeader from './PrivateHeader';
// import {Session} from 'meteor/session';


//USER CLICKS MESSAGE BUTTON -> TAKEN TO ONE ON ONE PAGE WITH PERSON WHERE TEHEY CAN MESSAGE
    //your userId and their userId is stored in document, where messages are isApproved

//ALL MESSAGES PAGE WHERE THEY CAN SEE THE CHATS WITH EVERYONE THEY MESSAGED
    //pull up all chats where the userId matches yours as the sender

export default class MessagingRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages:[]
    };
  }

  componentWillMount() {
  Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id

  }

  //needs to display all msges, may need session to constantly update
    displayMessages(){
        // console.log("ComponentDidMount fires AllPost");
        this.postTracker =  Tracker.autorun(() => {
            Meteor.subscribe('specificChatSubscription');
            const thisChat = Chat.find({senderId:Meteor.userId()}).fetch();

        });


    }

    render() {
      console.log(this.props.location);
      return (
        <div>
            <div className = "container-fluid header">
                  <div className = "jumborton">
                      <p className = "header-loggedInAs text-right">Logged in as:{this.props.username} </p>
                        <PrivateHeader   />
                  </div>
              </div>

              <Link to ="/home">All Chats</Link>
        
              <ChatComponent props={this.props}/>
              {this.displayMessages()}

        </div>
      );
    }


  }
