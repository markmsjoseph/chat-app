import React from 'react';


import { Link } from 'react-router-dom';
import {Post} from '../api/post';
import PrivateHeader from './PrivateHeader';
import AddPostForm from './AddPostForm';

export default class AddPost extends React.Component {

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
                    <PrivateHeader title="Sell Your Stuff" subtitle="Add New Post" />
                    <div className="back_to_all_post">
                          <Link to ="/home">Back to all post</Link>
                    </div>
              </div>

              <div className="wrapper">
                  <AddPostForm/>
              </div>
              
        </div>
      );
    }
  }
