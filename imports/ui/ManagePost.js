import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import PrivateHeader from './PrivateHeader';

export default class ManagePost extends React.Component {

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
    }


    render() {
      return (
        <div>
          <div className = "wrapper wrapper-top">
                <PrivateHeader title="Sell Your Stuff" subtitle="Edit or Delete Post" />
                <div className="back_to_all_post">
                      <Link to ="/home">Back to all post</Link>
                </div>
              </div>
              <EditPost />

        </div>
      );
    }
  }
