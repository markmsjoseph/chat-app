import React from 'react';
import {Post} from '../api/post';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import {Session} from 'meteor/session';


export default class EditPost extends React.Component {

//should pass in name, price, des etc as props because cannot set the state in the placeholder field becuse state changes first in willmount then again
//in render and not sure which is called first
  constructor(props) {
    super(props);
    this.state = {
      post:'',
      name:'',
      price:'',
      description:'',
      image:''
    };
    this.onNameChange = this.onNameChange.bind(this);
    // this.onNameChange = this.onNameChange.bind(this);
  }



  onNameChange(e){
    e.preventDefault();
    console.log("on name change clicked");
  }



  componentDidMount(){
              const currentPost = Post.find({_id:this.props.history.location.pathname.split('/')[2]}).fetch();
              console.log("CUrr post ", currentPost);
              this.setState({
                name:currentPost.name,
                price:currentPost.price,
                description:currentPost.description,
                image:currentPost.image
              });
  }
  //
  componentWillUnmount() {
    this.postTracker.stop();
  }
  //save the new post info in the State
  //update the database with it
  onSubmit(e){
    // const name = this.refs.nameRef.value.trim();
    // const price = this.refs.priceRef.value.trim();
    // const description = this.refs.descriptionRef.value.trim();
    // const image = this.refs.imageRef.value.trim();

      //insert into database
      // Post.insert({ description, userId:Meteor.userId() });
      //call meteor method post.insert with the data which is stored in description
      // Meteor.call('post.insert', [name, price, description])
      //clear whatever value was in inputbox
      // this.refs.nameRef.value = '';
      // this.refs.priceRef.value = '';
      // this.refs.descriptionRef.value = '';
      // this.refs.imageRef.value = '';
  }

  renderPostListItems(){
    // const currentPost = Post.find({_id:this.props.history.location.pathname.split('/')[2]}).fetch();
    // console.log(currentPost);
    let idTwo = this.props.history.location.pathname.split('/')[2];
      return (
        <div className = "wrapper wrapper__post">
                <div className="item item__post-title">
                      <h3> {idTwo} </h3>
                       <input type="text" ref="nameRef" placeholder={this.state.name} onChange={this.onNameChange}/><br/>




                </div>
        </div>
      )
  }

  render() {
    return (
      <div>
        <h2> Your Current Post </h2>
          <Link to ="/managePost">Back to manage post</Link>
        {this.renderPostListItems()}

      </div>
    );
  }


  }
