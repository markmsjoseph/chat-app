import React from 'react';
import {Post} from '../api/post';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


export default class AddPost extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      post:[]
    };
  }

  //called after stuff is rendered to the screen in render
  componentDidMount() {
    console.log("ComponentDidMount fires PostList");
    this.postTracker =  Tracker.autorun(() => {
        Meteor.subscribe('specificPostSubscription');
      //find all links with no args. then call fetch on cursor to get all link documents back
        const allPost = Post.find().fetch();
        this.setState({post:allPost});
    });
  }

  //fires right before component is removed from screen
  componentWillUnmount() {
    console.log("Component Unmount fires PostList");
    //video 69 15:18 called to stop component from getting updated
    this.postTracker.stop();
  }

  onSubmit(e){
    const name = this.refs.nameRef.value.trim();
    const price = this.refs.priceRef.value.trim();
    const description = this.refs.descriptionRef.value.trim();
    const image = this.refs.imageRef.value.trim();
    e.preventDefault();

      //insert into database
      // Post.insert({ description, userId:Meteor.userId() });
      //call meteor method post.insert with the data which is stored in description
      Meteor.call('post.insert', [name, price, description])
      //clear whatever value was in inputbox
      this.refs.nameRef.value = '';
      this.refs.priceRef.value = '';
      this.refs.descriptionRef.value = '';
      this.refs.imageRef.value = '';

  }
  onNameChange(e){
      const name = e.target.value;
      console.log("changing name");
  }

  onImageChange(e){

  }

  renderPostListItems(){
    return this.state.post.map((post)=>{
      console.log(post);
      return <div key={post._id}> <p>{post.description}</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                  <input type="text" ref="nameRef" placeholder="Post Name" value={post.name} onChange={this.onNameChange}/><br/>
                  <input type="text" ref="priceRef" placeholder="Enter Price" value={post.price} onChange={this.onPriceChange}/><br/>
                  <input type="text" ref="descriptionRef" placeholder="Enter Description" value={post.description} onChange={this.onDescriptionChange}/><br/>
                  <input type="text" ref="imageRef" placeholder="Enter Description" value={post.image} onChange={this.onImageChange}/><br/>
                    <button>Update Post </button>
                    <br/><br/>
              </form>
        </div>
    })
  }

  render() {
    return (
      <div>
        <h2> Your Current Post </h2>
        {this.renderPostListItems()}

      </div>
    );
  }


  }
