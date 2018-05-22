import React from 'react';
// import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import AllPost from './AllPost';
// import AllChats from './AllChats';
import PrivateHeader from './PrivateHeader';






export default class Home extends React.Component {


  constructor(props) {
    super(props);
        this.state = {
        username:""
        };
  }

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }

    }

    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {
          console.log("USERNAME-----------------------:", Meteor.user());
          if(Meteor.user()){
            this.setState(()=>{
              return{
                username:Meteor.user().username
              }
            });
          }
          else{
            console.log("No User");
          }
      });

    }

    renderAdminPageButton(){
      // meteor.
      // var uniqueID = Meteor.users.find({}).fetch();
      // // var username = Meteor.users.find({_id: uniqueID});
      // console.log("USERNAMEEE", uniqueID);
      if(Meteor.userId() == "bpe7Kafu9xq3DFR2g"){

          return(
            <div className="  wrapper__post ">
              <Link to ="/adminPage">Admin Page</Link>
            </div>
          );

      }
    }

    render() {
      return (
        <div>
        <div className = "wrapper wrapper-top">
                    <PrivateHeader  title="Sell Your Stuff" shortDes="users should be able to see all post on this page. Post will contain a image, price and short description. Each post will a link to more details about it. EVERYONE CAN SEE EVERYTHING ON THIS PAGE " />
                    <p className = "logged-in-as">Logged in as:{this.state.username} </p>

                    <div className="wrapper-top-main-links">
                        <Link to ="/addPost">Add New Item To Sell</Link>
                        <Link to ="/savedPost">Saved Post</Link>
                        <Link to ="/allChats">All Chats</Link>
                        <Link to ="/managePost">Manage Your Post</Link>
                        {this.renderAdminPageButton()}
                      </div>
            </div>




            <AllPost />
        </div>
      );
    }


  }
