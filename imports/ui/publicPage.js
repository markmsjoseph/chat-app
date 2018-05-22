import React from 'react';
// import { Accounts } from 'meteor/accounts-base';

import AllPost from './AllPost';
import PublicHeader from './publicHeader';
import PublicAllPost from './publicAllPost';

export default class Home extends React.Component {


    componentWillMount() {
       if (Meteor.userId()){
         console.log("Has user but trying to go to authenticated page: In ComponentDidMount from Login.js");
             this.props.history.push('/home');
       }

   }



    render() {
      return (
          <div>
                  <div className = "wrapper wrapper-top">
                        <PublicHeader  title="Sell Your Stuff" subtitle="Users must Register/Login to chat/add post" />
                        <div className="wrapper-top-main-links">

                        </div>

                  </div>
                    <PublicAllPost />
          </div>
      );
    }


  }
