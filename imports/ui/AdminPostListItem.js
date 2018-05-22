import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AdminPostListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen:false
    };
  }

    deletePost(){
      //call save method in post.js with 2 arguments
      Meteor.call('post.remove', this.props._id)
    }


    render() {
      return (
          <div className = "wrapper wrapper__post">
          <div className="item">
                <h3 className='item__post-title'> {this.props.name} </h3>
                <p> Price: ${this.props.price} </p>
                <p> Posted by: {this.props.username} </p>
                <img className ='item__image' src={this.props.image}/><br/>
                <p>{this.props.description} </p>

                <button className='addPost__form__Submit' onClick={()=>this.setState({isOpen:true})}>Delete Post</button>

                <Modal isOpen = {this.state.isOpen} contentLabel="Remove post">
                      <p>Are you sure you want to delete this post, it will not be approved and be removed from the database? </p>
                      <button onClick={this.deletePost.bind(this)}>Delete Post </button>
                      <button onClick={()=>this.setState({isOpen:false})}>Cancel Delete Post</button>
                </Modal>
          </div>
        </div>
      );
    }


  }
