import React from 'react';
import {Post} from '../api/post';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import EditExpenseForm from './EditExpenseForm';
import Modal from 'react-modal';

export default class EditPost extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      post:[],
      name:'',
      price:'',
      description:'',
      image:'',
      isOpen:false
    };
    // this.updatePost = this.updatePost.bind(this);
    // this.onNameChange = this.onNameChange.bind(this);
    // this.onNameChange = this.onNameChange.bind(this);
    // this.onNameChange = this.onNameChange.bind(this);
  }

  //called after stuff is rendered to the screen in render
  componentDidMount() {

    this.postTracker =  Tracker.autorun(() => {
      //find post where the is is the current user
        Meteor.subscribe('specificPostSubscription');
      //find all links with no args. then call fetch on cursor to get all link documents back
        const allPost = Post.find().fetch();
        this.setState({post:allPost});
    });
  }

  //fires right before component is removed from screen
  componentWillUnmount() {

    //video 69 15:18 called to stop component from getting updated
    this.postTracker.stop();
  }

  //save the new post info in the State
  //update the database with it
//   onSubmit(e){
//     // const name = this.refs.nameRef.value.trim();
//     // const price = this.refs.priceRef.value.trim();
//     // const description = this.refs.descriptionRef.value.trim();
//     // const image = this.refs.imageRef.value.trim();
//     e.preventDefault();
//     console.log("on submit clicked!!!!!!!!!! for :", this.refs.postid);
//       //insert into database
//       // Post.insert({ description, userId:Meteor.userId() });
//       //call meteor method post.insert with the data which is stored in description
//       // Meteor.call('post.insert', [name, price, description])
//       //clear whatever value was in inputbox
//       // this.refs.nameRef.value = '';
//       // this.refs.priceRef.value = '';
//       // this.refs.descriptionRef.value = '';
//       // this.refs.imageRef.value = '';
// //<input type="text" ref="postid" value={post._id}/>
//   }
  // updatePost(e){
  //     const name = e.target.value;
  //     console.log("Name is: ", name);
  //     console.log(this.state.name);
  //     console.log("Changing name");
  //     this.setState({name:name});
  // }
  //
  // onNameChange(e){
  //   e.preventDefault();
  //   const name = e.target.value;
  //   this.setState({name:name});
  // }



  // renderPostListItems(){
  //   return this.state.post.map((post)=>{
  //     // console.log(post);
  //     return <div key={post._id}> <p>{post.description}</p>
  //
  //             <form onSubmit={this.onSubmit.bind(this)}>
  //                 <input type="text" ref="nameRef" placeholder="Post Name" value={post.name} onChange={this.onNameChange}/><br/>
  //                 <input type="text" ref="priceRef" placeholder="Enter Price"  value={post.price} onChange={this.onPriceChange}/><br/>
  //                 <input type="text" ref="descriptionRef" placeholder="Enter Description"  value={post.description} onChange={this.onDescriptionChange}/><br/>
  //                 <input type="text" ref="imageRef" placeholder="Enter Description" value={post.image} onChange={this.onImageChange}/><br/>
  //                   <button>Update Post </button>
  //                   <br/><br/>
  //             </form>
  //       </div>
  //   })
  // }

  deleteChat(postId){
      this.setState({isOpen:false})
      Meteor.call('post.remove', postId)
  }

  renderPostListItems(){
    console.log("IN EDITPOST");
       // <Link to ={`/EditExpenseForm/${post._id}` id={post._id} }>Update Post</Link>
    return this.state.post.map((post)=>{
      return (
        <div className = "wrapper wrapper__post">
                <div className="item item__post-title">
                      <p key={post._id}>{post.name} </p>
                       <p>Posted by:{post.userId}</p>
                       <p>Price:{post.price}</p>
                       <p>{post.description}</p>
                       <img className ='item__image' src={post.image}/><br/><br/>


                         <button className='addPost__form__Submit' onClick={()=>this.setState({isOpen:true})}>Delete Post</button>

                       <Modal isOpen = {this.state.isOpen} contentLabel="Remove post">
                                <p>Are you sure you want to delete this Post? </p>
                                <button onClick={this.deleteChat.bind(this,post._id)}>Delete Post </button>
                                <button onClick={()=>this.setState({isOpen:false})}>Cancel Delete Post</button>
                          </Modal>


                </div>
        </div>
      )
      //return <p key={post._id}> {post.description} </p>
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
