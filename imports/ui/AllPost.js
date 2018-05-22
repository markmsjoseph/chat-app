import React from 'react';
import {Post} from '../api/post';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import PostListItem from './PostListItem';
import FlipMove from 'react-flip-move';


export default class AllPost extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        post:[]
      };
    }

    //called after stuff is rendered to the screen in render
    componentDidMount() {
      // console.log("ComponentDidMount fires AllPost");
      this.postTracker =  Tracker.autorun(() => {
          Meteor.subscribe('allPostSubscription');
          //find all links which are approved. then call fetch on cursor to get all link documents back
          const allPost = Post.find({isApproved:'yes'}).fetch();
          this.setState({post:allPost});
      });

    }

    //fires right before component is removed from screen
    componentWillUnmount() {
      // console.log("Component Unmount fires PostList");
      //video 69 15:18 called to stop component from getting updated
      this.postTracker.stop();
    }

    // (
    //   <div class="col-xs-12 col-sm-4 col-md-2 ">
    //     <PostListItem key={post._id}   {...post} />;
    //   </div>
    //
    // )
    renderPostListItems(){
      return this.state.post.map((post)=>{
        return <PostListItem key={post._id}   {...post} />;

      });
    }

    onSortByDesc(){
      const allPost = Post.find({isApproved:'yes'}, {sort:{price:-1}}).fetch();
      this.setState({post:allPost});
    }

    onSortByAsec(){
      const allPost = Post.find({isApproved:'yes'}, {sort:{price:1}}).fetch();
      this.setState({post:allPost});
    }

    handleSearch(e){
      e.preventDefault();
      const name = e.target.value.trim();
      console.log(name);

      if (name!=""){
          // console.log("NAME TO SEARCH", name);
          const allPost = Post.find({ $and:[{isApproved:'yes'}, {name: { '$regex' : name, '$options' : 'i' }} ] }).fetch();
          // console.log("SEARCH TERM", allPost);
          this.setState({post:allPost});
      }
      else{
        const allPost = Post.find({isApproved:'yes'}).fetch();
        this.setState({post:allPost});

      }


    }


    render() {
      return (
        <div>
          <div class="container-fluid noPadding">
                      <div className = "wrapper wrapper-top-search wrapper_search-and-filter">
                                      <div class="row text-center  ">
                                              <div class="col-xs-12 col-sm-12 col-md-4 centerColumn ">
                                                  <input className = ' search-form form-control form-control-lg ' type="text" placeholder="SEARCH" onChange={this.handleSearch.bind(this)}/><br/>
                                              </div>
                                      </div>

                                      <div class="row ">
                                          <div class="col-xs-12 col-sm-12 col-md-12 rightAlign">
                                              <button className=" sort_button " onClick={this.onSortByDesc.bind(this)}>Sort by Price Asc(Largest to Smallest)</button>
                                          </div>
                                          <div class="col-xs-12 col-sm-12 col-md-12 rightAlign">
                                              <button className=" sort_button " onClick={this.onSortByAsec.bind(this)}>Sort by Price Desc(Smallest to Largest)</button>
                                          </div>
                                    </div>
                        </div>

          </div>






            <div className = "wrapper">
              <div class="container-fluid">
  <div class="row">
                  <FlipMove>

                    {this.renderPostListItems()}
                  </FlipMove>
                </div>
              </div>
            </div>
          </div>
      );
    }


  }
