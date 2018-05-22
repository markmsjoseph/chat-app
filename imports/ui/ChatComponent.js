import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Chat} from '../api/chat';
import {Post} from '../api/post';
import {browserHistory,withRouter} from "react-router-dom"

export default class ChatComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg:[],
      currentChatIDName:""
    };
  }

  //on mount we display the messages from previous time they chatted
  componentDidMount() {
          // if (Meteor.userId() == this.props.props.location.pathname.split('/')[2]){
          //   console.log(" CANNOT MESSAGE YOURSELF");
          //       history.push('/home');
          // }
          this.postTracker =  Tracker.autorun(() => {



              //we get the username to be used later. we need to call this in tracker autorun because at first, the user is null because
              //of different rendering times, when we get the user, then we set the state to the username
              if(Meteor.user()){
                this.setState(()=>{
                  return{
                    currentChatIDName:Meteor.user().username
                  }
                });
              }

              //find all links which are approved. then call fetch on cursor to get all link documents back
              let yourID = Meteor.userId();
              let idTwo = this.props.props.location.pathname.split('/')[2];
              const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();
              //console.log("DATABASE QUERY 1: db.chat.find({\"senderId:\"",yourID, ", \"receiverId:\"",idTwo,"});")
              const currentChat2 = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
              //console.log("DATABASE QUERY 2: db.chat.find({\"senderId:\"",idTwo, ", \"receiverId:\"",yourID,"});");

              //there was no previous chat because the above queries returned null
              if(!currentChat[0] && !currentChat2[0]){
                console.log("NO CHAT FOR BOTH USERS");
              }

              //THERE WAS A PREVIOUS CHAT SO WE NEED TO RETRIEVE MESSAGES
              else if(currentChat[0]){
                console.log("THERE WAS A PREVIOUS CHAT 1");
                  // console.log("--------SENDER ID: ", currentChat[0].senderId);
                  const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();
                  this.setState(()=>{
                    return{
                      msg:currentChat[0].messages
                    }
                  });
              }//end else

              else if(currentChat2[0]){
                  console.log("THERE WAS A PREVIOUS CHAT 2");
                  const currentChat = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
                  this.setState(()=>{
                    return{
                      msg:currentChat[0].messages
                    }
                  });
              }//end else

          });//end tracker autorun


  }

  componentWillUnmount() {
    //video 69 15:18 called to stop component from getting updated
    this.postTracker.stop();
  }



  onSubmit(e){
        e.preventDefault();

        let newMessage = this.refs.senderMsg.value.trim();
        let userAndMessage = {message:newMessage, yourId:this.state.currentChatIDName};

        // if nothing in input box and submit clicked return from function without doing anything
        if(!this.refs.senderMsg.value){
          console.log("Empty");
          return;
        }

        //IF THERE IS A MSG AND THE MESAGE ARRAY IS EMPTY, CREATE A NEW CHAT OTHERWISE WE READ DATA FROM THE OLD CHAT
        if(newMessage && this.state.msg.length == 0 ){
              console.log("---------------------------CREATED NEW CHAT AND INSERT FIRST MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('/')[2]);
              let userAndMessage = {message:newMessage, yourId:this.state.currentChatIDName};
              let yourID = Meteor.userId();
              let idTwo = this.props.props.location.pathname.split('/')[2];
              this.setState(()=>{
                return{
                  msg:[ userAndMessage]
                }
              });
              //create a chat only if person sends a msg and pass in the id of the person who is selling the item

              Meteor.call('chat.create', [this.props.props.location.pathname.split('/')[2], this.state.currentChatIDName, this.props.props.location.pathname.split('/')[3]])
              console.log("DATA I WANT*************************************", this.props.props.location.pathname.split('/'));
              Meteor.call('chat.insertMsg',[yourID, idTwo, userAndMessage])
                console.log("GOING TO INSERT:", userAndMessage, "into chat of:", this.props.props.location.pathname.split('/')[2]);
              this.refs.senderMsg.value = '';
              // console.log("STATE: ", this.state.msg);
              // let stateArray = this.state.msg;
              // Meteor.call('chat.insertMsg',[this.props.props.location.pathname.split('t/')[1], stateArray])
        }

        //ELSE IF THERE IS A MESSAGE AND THE ARRAY IS NOT EMPTY WE UPDATE THE DOCUMENT'S MESSAGE ARRAY
        if(newMessage && this.state.msg.length != 0){
        //  console.log("---------------------------INSERT ANOTHER MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
              let userAndMessage = {message:newMessage, yourId:this.state.currentChatIDName};
              // console.log("--------new message : ", userAndMessage);
                this.setState((prevState)=>{
                  return{
                    msg:[...prevState.msg, userAndMessage]
                  }
                });
                // let stateArray = this.state.msg;
                // console.log("GOING TO INSERT:", userAndMessage, "into chat of:", this.props.props.location.pathname.split('t/')[1]);
                // Meteor.call('chat.insertMsg',[this.props.props.location.pathname.split('t/')[1], userAndMessage])



                let yourID = Meteor.userId();
                let idTwo = this.props.props.location.pathname.split('/')[2];
                const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();
                console.log("DATABASE QUERY: db.chat.find({\"senderId:\"",yourID, ", \"receiverId:\"",idTwo,"});");
                console.log(currentChat);

                const currentChat2 = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
                console.log("DATABASE QUERY: db.chat.find({\"senderId:\"",idTwo, ", \"receiverId:\"",yourID,"});");
                console.log(currentChat2);


                //THERE WAS A PREVIOUS CHAT SO WE NEED TO RETRIEVE MESSAGES
                if(currentChat[0]){
                    // console.log("--------SENDER ID: ", currentChat[0].senderId);
                    const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();

                    Meteor.call('chat.insertMsg',[yourID, idTwo, userAndMessage])
                    console.log("1-----INSERT ANOTHER MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
                      this.refs.senderMsg.value = '';
                }//end else

                else {
                    const currentChat = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
                    Meteor.call('chat.insertMsg',[idTwo, yourID, userAndMessage])
                    console.log("2-----INSERT ANOTHER MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
                      this.refs.senderMsg.value = '';
                }//end else
        }
  }


  renderMessages(){
    return this.state.msg.reverse().map((post)=>{
      return <div>

                  <div className="chatBox">
                      <p className = "chatSender_Title">{post.yourId} says:</p>
                        <p className = "chatActualMessage">{post.message}</p>

                  </div>
          </div>
    })
  }



  render() {
    // console.log("rendering time");
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
              <input className=" chatInputBox " type="text" ref="senderMsg" placeholder="Enter Message"/>
              <button className = "sendChatMessage">Send Message </button>
        </form>

        {this.renderMessages()}

      </div>
    );
  }


  }
