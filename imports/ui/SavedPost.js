import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import {Tracker} from 'meteor/tracker';
import {Post} from '../api/post';

export default class SavedPost extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        cart:[],
        filteredItems:[]
      };
    }

    //sets state of filteredItems to all post that current user has saved
    filterPostListItems(entireCart){
      //go through each object's cart array and filter it to new array with post's id if it's cart array contails current user
      //filter returns the entire object if it's cart contains the current user's id
      let savedPostList =  entireCart.filter(function(object){
          //if current user is in the saved cart array
           if(object.cart.includes(Meteor.userId())){
             return object._id;
           }
      })
      //filter returns each opject that passes the test so we use map to get the post's id alone into a new array
      // let newSavedPostList =  savedPostList.map(function(object){
      //    return object._id;
      // })
      // console.log("MAPPED ARRAY:",newSavedPostList);
      this.setState({filteredItems:savedPostList});
    }

    //checks to make sure used is logged else redirects
    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
    }

    //calls tracker autorun, makes sure user can see specific data, calls filterPostListItems
    componentDidMount() {
      console.log("mounting done");
      this.postTracker =  Tracker.autorun(() => {
          //display items that match user id alone
          Meteor.subscribe('allPostSubscription');

          //find all links with no args. then call fetch on cursor to get all link documents back
          const entireCart = Post.find({}).fetch();

          console.log("set state done");
          this.filterPostListItems(entireCart);
          console.log("arr: ", this.state.filteredItems);
      });
    }

    //fires right before component is removed from screen
    componentWillUnmount() {
      console.log("Component Unmount fires save post");
      //video 69 15:18 called to stop component from getting updated
      this.postTracker.stop();
    }

    removeFromCart(idToRemove){
        //   let savedPostList =  this.state.filteredItems.filter(function(object){
        //       //if current user is in the saved cart array
        //        if(object._id != idToRemove){
        //          return object._id;
        //        }
        //   }
        //
        // )
        // this.setState({filteredItems:savedPostList});
        Meteor.call('post.removeFromCart', idToRemove)
    }

    renderPostListItems(){
      console.log("rendering items");
      return this.state.filteredItems.map((post)=>{
        // return <PostListItem key={post._id}  {...post} />;
            return (
              <div className = "wrapper wrapper__post">
                      <div className="item item__post-title">
                            <p key={post._id}>{post.description} </p>
                             <p>Posted by:{post.userId}</p>
                             <p>Price:{post.price}</p>
                             <img className ='item__image' src={post.image}/><br/><br/>
                            <button className='addPost__form__Submit' onClick={this.removeFromCart.bind(this,post._id)}>Remove From Cart </button>
                      </div>
              </div>
            )
      })
    }


    render() {
      return (
        <div>
          <div className = "wrapper wrapper-top">
                <PrivateHeader title="Sell Your Stuff" subtitle="Saved Post" />
                <div className="back_to_all_post">
                      <Link to ="/home">Back to all post</Link>
                </div>
          </div>
          <div>
          {this.renderPostListItems()}
          </div>
        </div>
      );
    }


  }
